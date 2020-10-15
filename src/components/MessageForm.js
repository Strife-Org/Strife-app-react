import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/database";

import FileUploader from "./FileUploader";

function MessageForm(props) {
  const [message, setMessage] = useState("");

  const handleInput = (event) => {
    setMessage(event.target.value);
  };
  return (
    <div>
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
          placeholder={window.remoteConfig.getString("message_box_placeholder")}
          onChange={handleInput}
          value={message}
        />
        <button type="submit">Send</button>
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
