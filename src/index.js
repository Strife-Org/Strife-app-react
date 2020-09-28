import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics"
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

firebase.analytics()

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
