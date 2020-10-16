import React, { useState, useRef } from "react";

import firebase from "firebase/app";
import "firebase/database";

import FileUploader from "./FileUploader";
import Icon from "./Icon"

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
    <div>
      <div onKeyPressCapture={handleKeyPress}>
        <div
          id="message"
          contentEditable="true"
          onInput={(e) => {
            setMessage(e.target.innerText);
          }}
          ref={inputRef}
        >
        </div>
        <div className="placeholder" style={(message !== "" ? {display: 'none'} : {})}>
          {window.remoteConfig.getString("message_box_placeholder")}
        </div>
        <button type="submit" onClick={handleSubmit}>
          <Icon icon="PaperPlane" />
        </button>
      </div>
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
