import React from "react";
import ReactGA from "react-ga";
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
      const data = doc.data();
      if (data) {
        unsubscribe();
        firebase
          .auth()
          .signInWithCustomToken(data.authToken)
          .then((result) => {
            // var user = result.user;
            // if (user) {
            //   var { uid, displayName, email, emailVerified, photoURL } = user;
            //   var { username, providerId, profile } = result.additionalUserInfo;
            //   var data = {
            //     displayName,
            //     email,
            //     emailVerified,
            //     photoURL,
            //   }
            //   if(providerId) data.providerId = providerId
            //   if(profile) data.profile = profile
            //   if(username) data.username = username
            //   if (result.credential) {
            //     var { accessToken, signInMethod } = result.credential;
            //     data.credential = {accessToken, signInMethod}
            //   }
            //   var userDocRef = db.collection("users").doc(uid);
            //   userDocRef
            //     .set(data)
            //     .catch(function (error) {
            //       console.error("Error adding document: ", error);
          });
      }
      oneTimeCodeRef.delete();
    });

    const url = `https://strife-app-cd19a.web.app/?provider=${props.provider}&ot-auth-code=${id}`;

    ipcRenderer.send("external", url);

    ReactGA.event({
      category: "User",
      action: "Login button click",
    });
  }
  return (
    <button onClick={handleClick}>
      <Icon icon={props.provider} />
      Log-in with {props.provider}
    </button>
  );
}
