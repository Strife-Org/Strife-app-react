import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Message from "./Message";

export default function Messages(props) {
  return (
    <ul>
      {Object.keys(props.data).map((key) => {
        const message = props.data[key];
        return (
          <Message
            key={key}
            isOwner={firebase.auth().currentUser.uid === message.owner}
            text={message.text}
            file={message.file}
          />
        );
      })}
    </ul>
  );
}
