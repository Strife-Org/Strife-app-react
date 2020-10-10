import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import Connection from "./Connection";
import firebase from "firebase/app";

export default () => {
  var [contactName, setContactName] = useState("");
  var [foundContacts, setFoundContacts] = useState([]);
  return (
    <Popup
      trigger={<button className="button">Add Conversation</button>}
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post(
                  "https://us-central1-strife-app-cd19a.cloudfunctions.net/getUsersByDisplayName",
                  {
                    name: contactName,
                  }
                )
                .then((response) => {
                  setFoundContacts(response.data);
                })
                .catch(console.error);
            }}
          >
            <input
              type="text"
              name="contactName"
              id="contactName"
              onChange={(c) => {
                setContactName(c.target.value);
              }}
              value={contactName}
              placeholder="Contact name"
            />
            <button type="submit">+</button>
          </form>
          <ul>
            {foundContacts.map((contact) => <li key={contact.uid}><Connection data={{ user: contact }} onClick={() => {
              var users = {}
              console.log(firebase.auth().currentUser)
              users[firebase.auth().currentUser.uid] = {
                exists: true,
                displayName: firebase.auth().currentUser.displayName,
                photoURL: firebase.auth().currentUser.photoURL,
              }
              console.log(contact)
              users[contact.uid] = {
                exists: true,
                displayName: contact.displayName,
                photoURL: contact.photoURL,
              }
              console.log({
                accepted: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                users: users
              })
              firebase.firestore().collection('connections').add({
                accepted: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                users: users
              })
            }} /></li>)}
          </ul>
        </div>
      )}
    </Popup>
  );
};
