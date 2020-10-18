import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import Connection from "./Connection";
import firebase from "firebase/app";
import Loader from "react-loader-spinner";
import { FaPlus } from "react-icons/fa";

export default () => {
  var [contactName, setContactName] = useState("");
  var [foundContacts, setFoundContacts] = useState([]);
  var [loading, setLoading] = useState(false);

  return (
    <div className="addContact">
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          axios
            .post(
              "https://us-central1-strife-app-cd19a.cloudfunctions.net/getUsersByDisplayName",
              {
                name: contactName,
              }
            )
            .then((response) => {
              setFoundContacts(response.data);
              setLoading(false);
            })
            .catch((err) => {
              console.error(err);
              setLoading(false);
            });
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
        <button type="submit"><FaPlus viewBox="0 0 500 500" className="icon" style={{height: '12px'}} /></button>
      </form>
      {loading ? (
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={10000} //3 secs
        />
      ) : (
        <ul>
          {foundContacts.map((contact) => (
            <li key={contact.uid}>
              <Connection
                data={{ user: contact }}
                onClick={() => {
                  setLoading(true);
                  var users = {};
                  users[firebase.auth().currentUser.uid] = {
                    exists: true,
                    displayName: firebase.auth().currentUser.displayName,
                    photoURL: firebase.auth().currentUser.photoURL,
                  };
                  users[contact.uid] = {
                    exists: true,
                    displayName: contact.displayName,
                    photoURL: contact.photoURL,
                  };
                  firebase
                    .firestore()
                    .collection("connections")
                    .add({
                      accepted: 0,
                      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                      users: users,
                      requester: firebase.auth().currentUser.uid,
                      requested: contact.uid,
                    })
                    .then(() => {
                      setLoading(false);
                    });
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
