import React from "react";
import Main from "./Main";
import Login from "./Login";
import {
  FirebaseAuthConsumer,
} from "@react-firebase/auth";

export default function CustomRouter(props) {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user, providerId }) => {
        if (!isSignedIn) {
          return <Login />;
        } else {
          return <Main />;
        }
      }}
    </FirebaseAuthConsumer>
  );
}
