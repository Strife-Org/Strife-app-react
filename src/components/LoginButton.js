import React from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { v4 } from "uuid";

import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

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
  var iconUnit;
  switch(props.provider) {
    case "github":
      icon = FaGithub
      iconUnit = 500
      break;
    case "google":
      icon= FcGoogle
      iconUnit = 50
      break;
    default:
      console.error('Fix provider')
  }

  return (
    <button onClick={handleClick} className="loginButton">
      {React.createElement(icon, {className: 'loginIcon', size: 25, viewBox: `0 0 ${iconUnit} ${iconUnit}`})}
      <span className="loginButtonText">Log-in with {props.provider}</span>
    </button>
  );
}
