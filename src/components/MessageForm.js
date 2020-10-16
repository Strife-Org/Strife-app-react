import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/database";

import FileUploader from "./FileUploader";

function MessageForm(props) {
  const [message, setMessage] = useState("");

  const handleInput = (event) => {
    setMessage(event.target.value);
  };

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
    }
  };

  return (
    <div>
      <div onKeyPressCapture={handleKeyPress}>
        <div
          id="message"
          contentEditable
          onChange={(e) => {
            console.log(e.target.innerText);
          }}
        >
          {message}
        </div>
        <div className="placeholder">{window.remoteConfig.getString("message_box_placeholder")}</div>
        <button type="submit" onClick={handleSubmit}>
          Send
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
