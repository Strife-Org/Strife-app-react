import React from "react";
import ReactGA from "react-ga";
import Icon from "../Icon";
import firebase from "firebase/app";
import "firebase/auth";
import '../../css/login.css'

export default function LoginButton(props) {
  function handleClick() {

    var provider;
    switch (props.provider) {
      case "github":
        provider = new firebase.auth.GithubAuthProvider();
        break;
      case "google":
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      default:
        console.log("Unsupported provider")
    }
    firebase.auth().signInWithRedirect(provider);
    ReactGA.event({
      category: "User",
      action: "Login button click",
    });
  }
  return (
<<<<<<< HEAD
    <button onClick={handleClick}>
      <Icon icon={props.provider} />
      Log-in with {props.provider}
=======
    <button onClick={handleClick} className="loginBox github">
      <Icon icon="github" />
      Log-in with github
>>>>>>> de8547c05b302575eae6448d1f9a91050756582c
    </button>
  );
}
