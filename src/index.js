import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { FirebaseAuthProvider } from "@react-firebase/auth";

import { FirestoreProvider } from "@react-firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcVgUKp9PQlA4f0gO_NK-nQ5vNMQLVLEM",
  authDomain: "strife-app-cd19a.firebaseapp.com",
  databaseURL: "https://strife-app-cd19a.firebaseio.com",
  projectId: "strife-app-cd19a",
  storageBucket: "strife-app-cd19a.appspot.com",
  messagingSenderId: "728118645988",
  appId: "1:728118645988:web:170382696bc68eb94a88f1",
  measurementId: "G-Y4SZF8FVZC",
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

firebase
  .auth()
  .getRedirectResult()
  .then(async function (result) {
    var user = result.user;
    if (user) {
      var { uid, displayName, email, emailVerified, photoURL } = user;
      var { username, providerId, profile } = result.additionalUserInfo;

      var userDocRef = db.collection("users").doc(uid);
      userDocRef
        .set({ displayName, username, email, emailVerified, photoURL, providerId, profile })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      if (result.credential) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var {accessToken, signInMethod} = result.credential;
        userDocRef.update({credential: {
          accessToken,
          providerId,
          signInMethod
        }})
        // ...
      }
    }
  })
  .catch(function (error) {
    // Handle Errors here.
    console.error(error);
  });

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <FirestoreProvider {...firebaseConfig} firebase={firebase}>
        <App />
      </FirestoreProvider>
    </FirebaseAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
