import React, { useState, useRef } from "react";

import firebase from "firebase/app";
import "firebase/database";

import FileUploader from "./FileUploader";
import { FaRegPaperPlane } from "react-icons/fa";

import "../styles/main__currentconversation__messageform.css";

function MessageForm(props) {
  const [message, setM] = useState("");
  const contentEditableRef = useRef();

  function setMessage(m) {
    setM(m);
    if (m === "") contentEditableRef.current.innerText = m;
    const containerHeight = window.screen.height - 80;
    const adjustedHeight = containerHeight/2 - (containerHeight/2 - 10 ) % 34;
    console.log(adjustedHeight)
    props.setContentEditableHeight(
      Math.min(
        contentEditableRef.current.scrollHeight + 2,
        adjustedHeight + 2
      )
    );
  }

  if (message.charCodeAt(0).toString(2) === "1010" && message.length === 1) {
    setMessage("");
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    if (message.trim().length > 0) {
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
    }
  };

  return (
    <div className="messageForm">
      <div
        onKeyPressCapture={handleKeyPress}
        className="contentEditableContainer"
      >
        <div
          id="message"
          contentEditable="true"
          style={{ maxHeight: props.contentEditableHeight }}
          onInput={(e) => {
            setMessage(e.target.innerText);
          }}
          ref={contentEditableRef}
          className="contentEditable"
        ></div>
        <div
          className="placeholder"
          style={message.length > 0 ? { display: "none" } : {}}
        >
          {window.remoteConfig.getString("message_box_placeholder")}
        </div>
      </div>
      <button type="submit" onClick={handleSubmit} className="sendButton">
        <FaRegPaperPlane viewBox="0 0 500 500" className="icon sendIcon" />
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
