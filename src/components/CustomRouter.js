import React from "react";
import Main from "./Main";
import Login from "./Login";
import ReactGA from "react-ga";
import {
  FirebaseAuthConsumer,
} from "@react-firebase/auth";

export default function CustomRouter(props) {
  console.log(props);

  ReactGA.pageview("/login");
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user, providerId }) => {
        if (!isSignedIn) {
          return <Login savedData={props.savedData} />;
        } else {
          return <Main />;
        }
      }}
    </FirebaseAuthConsumer>
  );
}
