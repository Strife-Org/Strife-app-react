import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Message from "./Message";

import styles from "./styles/Messages.module.css";

export default function Messages(props) {
  return (
    <ul className={styles.msgContainer}>
      {Object.keys(props.data).map((key) => {
        const message = props.data[key]
        return (
          <Message
            key={key}
            isOwner={firebase.auth().currentUser.uid === message.owner}
            text={message.text}
          />
        );
      })}
    </ul>
  );
}
