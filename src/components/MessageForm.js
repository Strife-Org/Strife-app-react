import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

function MessageForm(props) {
  const [message, setMessage] = useState(" ");

  const handleInput = event => {
    setMessage(event.target.value);
  };
    return (
        <form action="#" onSubmit={(e) => {
            e.preventDefault()
            firebase.firestore().collection('connections').doc(props.conversationId).collection('messages').add({owner: firebase.auth().currentUser.uid, sentAt: firebase.firestore.FieldValue.serverTimestamp(), text: message})
            setMessage("")
        }}>
            <input type="text" name="message" id="message" placeholder="Message..." onChange={handleInput} value={message} />
            <button type="submit">Send</button>
        </form>
    )
}

export default MessageForm
