import React, { useState } from "react";
import UserData from "./UserData";
import firebase from "firebase/app";
import "firebase/firestore";
import Loader from "react-loader-spinner";
import { FaPlus } from "react-icons/fa";

export default ({ existingConnections, changeTab, closePopup }) => {
  const [contactName, setContactName] = useState("");
  const [foundContacts, setFoundContacts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  var foundContactsArea;
  if (error) {
    foundContactsArea = <h2>{error}</h2>;
  } else if (loading) {
    foundContactsArea = (
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
        className="loader"
      />
    );
  } else if (foundContacts == null) {
    foundContactsArea = <div></div>;
  } else if (foundContacts.length === 0) {
    foundContactsArea = <h2>No contact found, try checking your spelling</h2>;
  } else if (foundContacts) {
    foundContactsArea = (
      <ul>
        {foundContacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                const connection = existingConnections.find((connection) => connection.user.id === contact.id);
                if (connection) {
                  if (connection.users[contact.id]) {
                    if (connection.accepted === 1) {
                      window.setCurrentConversation(connection.id);
                      closePopup();
                    } else if (
                      connection.requested === firebase.auth().currentUser.uid
                    ) {
                      changeTab();
                    } else {
                      setError("Please wait for the user to accept your request")
                    }
                  }
                } else {
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
                }
              }}
            >
              <UserData
                photoURL={contact.photoURL}
                displayName={contact.displayName}
              />
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="addContact">
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          const publicUserCollection = firebase
            .firestore()
            .collection("publicUser");
          Promise.all([
            publicUserCollection.doc(contactName.trim()).get(),
            publicUserCollection
              .where("displayName", "==", contactName.trim())
              .get(),
          ]).then((returned) => {
            var docs = [];
            if (returned[0].exists) {
              docs[0] = returned[0].data();
              docs[0].id = returned[0].id;
            }
            returned[1].forEach((doc) => {
              docs.push(doc.data());
              docs[docs.length - 1].id = doc.id;
            });
            docs.forEach((doc, index) => {
              if (doc.id === firebase.auth().currentUser.uid) {
                docs.splice(index, 1);
              }
            });
            setFoundContacts(docs);
            setLoading(false);
          });
        }}
      >
        <input
          type="text"
          name="contactName"
          id="contactName"
          className="contactName"
          onChange={(c) => {
            setContactName(c.target.value);
          }}
          value={contactName}
          placeholder="Contact name"
        />
        <button type="submit" className="findContact">
          <FaPlus
            viewBox="0 0 500 500"
            className="icon"
            style={{ height: "12px" }}
          />
        </button>
      </form>
      {foundContactsArea}
    </div>
  );
};
