import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/analytics";
import "firebase/performance";
import "firebase/remote-config";
import { FirebaseAuthProvider } from "@react-firebase/auth";

import { FirestoreProvider } from "@react-firebase/firestore";

const { ipcRenderer } = window.require("electron");
const {
  START_NOTIFICATION_SERVICE,
  NOTIFICATION_SERVICE_STARTED,
  NOTIFICATION_SERVICE_ERROR,
  NOTIFICATION_RECEIVED,
  TOKEN_UPDATED,
} = window.require("electron-push-receiver/src/constants");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcVgUKp9PQlA4f0gO_NK-nQ5vNMQLVLEM",
  authDomain: "strife-app-cd19a.firebaseapp.com",
  databaseURL: "https://strife-app-cd19a.firebaseio.com",
  projectId: "strife-app-cd19a",
  storageBucket: "strife-app-cd19a.appspot.com",
  messagingSenderId: "728118645988",
  appId: "1:728118645988:web:170382696bc68eb94a88f1",
  measurementId: "G-Y4SZF8FVZC"
};

firebase.initializeApp(firebaseConfig);

firebase.analytics();

firebase.performance();

// Listen for service successfully started
ipcRenderer.on(NOTIFICATION_SERVICE_STARTED, (_, token) => {
  currentToken = token;
});

// Handle notification errors
ipcRenderer.on(NOTIFICATION_SERVICE_ERROR, (_, error) => {
  console.warn("notification error", error);
});

var tokenDocId = null;
var currentToken = null;

// Send FCM token to backend
ipcRenderer.on(TOKEN_UPDATED, (_, token) => {
  currentToken = token;
  if (firebase.auth().currentUser) {
    if (tokenDocId) {
      firebase
        .firestore()
        .document(
          `users/${firebase.auth().currentUser.uid}/tokens/${tokenDocId}`
        )
        .update({
          token: token,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("tokens")
        .where("token", "==", currentToken)
        .limit(1)
        .get()
        .then(function (querySnapshot) {
          if (querySnapshot.docs.length === 0) {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .collection("tokens")
              .add({
                token: currentToken,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then((doc) => {
                tokenDocId = doc.id;
              });
          }
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
  }
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (currentToken) {
      if (!tokenDocId) {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("tokens")
          .where("token", "==", currentToken)
          .limit(1)
          .get()
          .then(function (querySnapshot) {
            if (querySnapshot.docs.length === 0) {
              firebase
                .firestore()
                .collection("users")
                .doc(user.uid)
                .collection("tokens")
                .add({
                  token: currentToken,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then((doc) => {
                  tokenDocId = doc.id;
                });
            }
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
      }
    }
  }
});

window.signout = () => {
  if (tokenDocId) {
    const doc = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("tokens")
      .doc(tokenDocId);
    doc.delete().then(() => {
      tokenDocId = null;
    });
  }
  firebase.auth().signOut();
};

// Display notification
ipcRenderer.on(NOTIFICATION_RECEIVED, (_, serverNotificationPayload) => {
  if (serverNotificationPayload.notification.body) {
    // payload has a body, so show it to the user
    let myNotification = new Notification(
      serverNotificationPayload.notification.title,
      {
        body: serverNotificationPayload.notification.body,
        image: serverNotificationPayload.notification.image,
        icon: serverNotificationPayload.notification.image,
      }
    );

    myNotification.onclick = () => {
      ipcRenderer.send("show-window");
    };
  } else {
    // payload has no body, so consider it silent (and just consider the data portion)
    console.log(
      "do something with the key/value pairs in the data",
      serverNotificationPayload.data
    );
  }
});

// Start service
const senderId = "728118645988";
ipcRenderer.send(START_NOTIFICATION_SERVICE, senderId);

const remoteConfig = firebase.remoteConfig();
remoteConfig.settings = {
  minimumFetchIntervalMillis: 120000,
};

window.remoteConfig = remoteConfig

remoteConfig.fetchAndActivate().then(() => {

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

})