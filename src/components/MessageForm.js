import React, { useState, useRef } from "react";

import firebase from "firebase/app";
import "firebase/database";

import FileUploader from "./FileUploader";
import Icon from "./Icon"

import styles from "./styles/MessageForm.module.css";

import styles from "./styles/Send.module.css"

function MessageForm(props) {
  const [message, setMessage] = useState("");
  const inputRef = useRef();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    console.log(message);
    if (message.trim() !== "") {
      const conversationRef = firebase
        .database()
        .ref("/conversations/" + props.conversationId);
      const newMessageRef = conversationRef.push();
      newMessageRef.set({
        owner: firebase.auth().currentUser.uid,
        sentAt: firebase.database.ServerValue.TIMESTAMP,
        text: message.trim(),
      });
      setMessage("");
      var editableDiv = inputRef.current;
      editableDiv.innerText = "";
    }
  };

  return (
<<<<<<< HEAD
    <div className={styles.formCont}>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          const conversationRef = firebase.database().ref(
            "/conversations/" + props.conversationId
          );
=======
    <div className={styles.container}>
      <div
        className={styles.contentEditableContainer}
        onKeyPressCapture={handleKeyPress}
      >
        <div
          className={styles.placeholder}
          style={message !== "" ? { display: "none" } : {}}
        >
          {window.remoteConfig.getString("message_box_placeholder")}
        </div>
        <div
          className={styles.contentEditable}
          id="message"
          contentEditable="true"
          onInput={(e) => {
            setMessage(e.target.innerText);
          }}
          ref={inputRef}
        ></div>
      </div>

      <button type="submit" onClick={handleSubmit} className={styles.send}>
        <Icon icon="send" />
      </button>

      <FileUploader
        commentDefault={message}
        handleSending={(fileLocation, text) => {
          const conversationRef = firebase
            .database()
            .ref("/conversations/" + props.conversationId);
>>>>>>> 55d1cfb6311bd79408cc03456f6878c0198ca313
          const newMessageRef = conversationRef.push();
          newMessageRef.set({
            owner: firebase.auth().currentUser.uid,
            sentAt: firebase.database.ServerValue.TIMESTAMP,
            text: text,
            file: fileLocation,
          });
          setMessage("");
        }}
<<<<<<< HEAD
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
=======
      />
>>>>>>> 55d1cfb6311bd79408cc03456f6878c0198ca313
    </div>
  );
}

export default MessageForm;
