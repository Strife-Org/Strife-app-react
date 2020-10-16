import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/database";

import FileUploader from "./FileUploader";

import styles from "./styles/Send.module.css"

function MessageForm(props) {
  const [message, setMessage] = useState("");

  const handleInput = (event) => {
    setMessage(event.target.value);
  };
  return (
    <div className={styles.formCont}>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          const conversationRef = firebase.database().ref(
            "/conversations/" + props.conversationId
          );
          const newMessageRef = conversationRef.push();
          newMessageRef.set({
            owner: firebase.auth().currentUser.uid,
            sentAt: firebase.database.ServerValue.TIMESTAMP,
            text: message,
          })
          setMessage("");
        }}
      >
        <input
          type="text"
          name="message"
          id="message"
          className={styles.messageClass}
          placeholder={window.remoteConfig.getString("message_box_placeholder")}
          onChange={handleInput}
          value={message}
        />
        <button type="submit" className={styles.send}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z"/></svg></button>
      </form>
      <FileUploader commentDefault={message} handleSending={(fileLocation, text) => {
        const conversationRef = firebase.database().ref(
          "/conversations/" + props.conversationId
        );
        const newMessageRef = conversationRef.push();
        newMessageRef.set({
          owner: firebase.auth().currentUser.uid,
          sentAt: firebase.database.ServerValue.TIMESTAMP,
          text: text,
          file: fileLocation
        })
        setMessage("");
      }} />
    </div>
  );
}

export default MessageForm;
