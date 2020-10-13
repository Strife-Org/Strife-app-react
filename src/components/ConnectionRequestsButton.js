import React, { Component } from "react";
import Popup from "reactjs-popup";
import Icon from "./Icon";
import firebase from "firebase/app";
import "firebase/firestore";
import UserData from "./UserData";
import AcceptDecline from "./AcceptDecline";
import styles from "./styles/ConnectionRequests.module.css";

function ConnectionRequests({ requests }) {
  return (
    <ul className={styles.requestsList}>
      {requests.map((request) => {
        return (
          <li key={request.id} className={styles.request}>
            <UserData
              displayName={request.user.displayName}
              photoURL={request.user.photoURL}
            />
            <AcceptDecline
              onAccept={() => {
                firebase
                  .firestore()
                  .doc(`/connections/${request.id}`)
                  .update({ accepted: 1 });
              }}
              onDecline={() => {
                firebase
                  .firestore()
                  .doc(`/connections/${request.id}`)
                  .update({ accepted: -1 });
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default class ConnectionRequestsButton extends Component {
  db = firebase.firestore();

  state = {
    connectionRequests: [],
  };

  newRequests = (querySnapshot) => {
    var requests = [];
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      data.id = doc.id;
      delete data.users[firebase.auth().currentUser.uid];
      data.user = data.users[Object.keys(data.users)[0]];
      data.user.id = Object.keys(data.users)[0];
      requests.push(data);
    });
    this.setState({ connectionRequests: requests });
  };

  componentDidMount() {
    this.db
      .collection("connections")
      .where("accepted", "==", 0)
      .where(`requested`, "==", firebase.auth().currentUser.uid)
      .onSnapshot(this.newRequests);
  }

  render() {
    return (
      <Popup
        trigger={
          <button className="button">
            <Icon icon="question" />
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <ConnectionRequests requests={this.state.connectionRequests} />
          </div>
        )}
      </Popup>
    );
  }
}
