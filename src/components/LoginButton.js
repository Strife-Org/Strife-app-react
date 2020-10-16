import React from "react";
import Icon from "./Icon";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { v4 } from "uuid";
const { ipcRenderer } = window.require("electron");

export default function LoginButton(props) {
  var db = firebase.firestore();
  function handleClick() {
    const id = v4();

    const oneTimeCodeRef = db.collection(`ot-auth-codes`).doc(id);

    var unsubscribe = oneTimeCodeRef.onSnapshot(async function (doc) {
      console.log(id)
      const data = doc.data();
      console.log(data)
      if (data) {
        unsubscribe();
        firebase
          .auth()
          .signInWithCustomToken(data.authToken).then(() => {
            oneTimeCodeRef.delete();
          })
      }
      
    });

    const url = `https://strife-app-cd19a.web.app/appLogin?provider=${props.provider}&ot-auth-code=${id}`;

    ipcRenderer.send("external", url);

    firebase.analytics().logEvent("sign-in", {provider: props.provider})
  }
  return (
    <button onClick={handleClick}>
      <Icon icon={props.provider} />
      Log-in with {props.provider}
    </button>
  );
}
