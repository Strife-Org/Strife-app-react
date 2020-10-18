import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import UserData from "./UserData";
import ApproveDecline from "./ApproveDecline";

export default class ConnectionRequestsButton extends Component {
  db = firebase.firestore();

  state = {
    connectionRequests: [],
  };

  newRequests = (querySnapshot) => {
    var requests = [];
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      console.log(JSON.stringify(data));
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
      <ul className="connectionRequests" >
      {this.state.connectionRequests.length > 0 ? this.state.connectionRequests.map((request) => {
        return (
          <li key={request.id}>
            <UserData
              displayName={request.user.displayName}
              photoURL={request.user.photoURL}
            />
            <ApproveDecline
              onApprove={() => {
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
      }) : (<div className="noRequests"><h2>You have no pending requests, go create some connections yourself</h2></div>)}
    </ul>
    );
  }
}
