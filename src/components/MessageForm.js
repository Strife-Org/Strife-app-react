import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

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
          firebase
            .firestore()
            .collection("connections")
            .doc(props.conversationId)
            .collection("messages")
            .add({
              owner: firebase.auth().currentUser.uid,
              sentAt: firebase.firestore.FieldValue.serverTimestamp(),
              text: message,
            });
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
      <FileUploader />
    </div>
  );
}

export default MessageForm;
