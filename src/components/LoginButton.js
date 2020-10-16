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

  var icon;
  switch(props.provider) {
    case "github":
      icon = "Github"
      break;
    case "google":
      icon= "Google"
      break;
    default:
      console.error('Fix provider')
  }

  return (
    <button onClick={handleClick} className="loginButton">
      <Icon className="loginButtonIcon" icon={icon} />
      <span className="loginButtonText">Log-in with {props.provider}</span>
    </button>
  );
}
