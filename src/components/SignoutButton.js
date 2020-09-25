import Icon from "./Icon";
import React from "react";
import firebase from "firebase/app";

export default function SignoutButton() {
  return (
    <button className="signout" onClick={(e) => {
        e.preventDefault();
        firebase.auth().signOut()
    }}>
      <Icon icon="signout" />
    </button>
  );
}
