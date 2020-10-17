import React, { useState, useRef } from "react";

import firebase from "firebase/app";
import "firebase/database";

import FileUploader from "./FileUploader";
import Icon from "./Icon";

import "../styles/main__currentconversation__messageform.css"

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
      const messagesRef = firebase
        .database()
        .ref("/conversations/" + props.conversationId + "/messages");
      const newMessageRef = messagesRef.push();
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
    <div className="messageForm" >
      <div onKeyPressCapture={handleKeyPress} className="contentEditableContainer">
        <div
          id="message"
          contentEditable="true"
          onInput={(e) => {
            setMessage(e.target.innerText);
          }}
          ref={inputRef}
          className="contentEditable"
        ></div>
        <div
          className="placeholder"
          style={message !== "" ? { display: "none" } : {}}
        >
          {window.remoteConfig.getString("message_box_placeholder")}
        </div>
      </div>
      <button type="submit" onClick={handleSubmit} className="sendButton" >
          <Icon icon="PaperPlane" className="sendIcon" />
        </button>
      <FileUploader
        commentDefault={message}
        handleSending={(fileLocation, text) => {
          const messagesRef = firebase
            .database()
            .ref("/conversations/" + props.conversationId + "/messages");
          const newMessageRef = messagesRef.push();
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
