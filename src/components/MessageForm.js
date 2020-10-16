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
        
        <div className="placeholder" style={(message !== "" ? {display: 'none'} : {})}>
          {window.remoteConfig.getString("message_box_placeholder")}
        </div>
        <button type="submit" onClick={handleSubmit}>
          Send
        </button>
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
          const newMessageRef = conversationRef.push();
          newMessageRef.set({
            owner: firebase.auth().currentUser.uid,
            sentAt: firebase.database.ServerValue.TIMESTAMP,
            text: text,
            file: fileLocation,
          });
          setMessage("");
        }}
      />
    </div>
  );
}

export default MessageForm;
