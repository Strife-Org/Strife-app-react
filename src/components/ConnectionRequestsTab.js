import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import UserData from "./UserData";
import ApproveDecline from "./ApproveDecline";

function arraysEqual(arr1, arr2) {
  if(arr1.length !== arr2.length)
      return false;
  for(var i = arr1.length; i--;) {
      if(arr1[i] !== arr2[i])
          return false;
  }

  return true;
}

export default class ConnectionRequestsTab extends Component {
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
    var requests = [];
    const ownUserId = firebase.auth().currentUser.uid;
    this.props.existingConnections.forEach(connection => {
      if(connection.requested !== ownUserId) return;
      if(connection.accepted !== 0) return;
      delete connection.users[ownUserId];
      connection.user = connection.users[Object.keys(connection.users)[0]];
      connection.user.id = Object.keys(connection.users)[0];
      requests.push(connection);
    })
   this.setState({connectionRequests: requests})
  }

  componentDidUpdate() {
    var requests = [];
    const ownUserId = firebase.auth().currentUser.uid;
    this.props.existingConnections.forEach(connection => {
      if(connection.requested !== ownUserId) return;
      if(connection.accepted !== 0) return;
      delete connection.users[ownUserId];
      connection.user = connection.users[Object.keys(connection.users)[0]];
      connection.user.id = Object.keys(connection.users)[0];
      requests.push(connection);
    })
    console.log(this.state.connectionRequests.toString())
    console.log(requests.toString())
    if(!arraysEqual(this.state.connectionRequests, requests)) this.setState({connectionRequests: requests})
  }

  render() {
    return (
      <ul className="connectionRequests">
        {this.state.connectionRequests.length > 0 ? (
          this.state.connectionRequests.map((request) => {
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
                    firebase
                      .firestore()
                      .doc(`/connections/${request.id}`)
                      .get()
                      .then((snapshot) => {
                        var data = snapshot.data();
                        console.log(data)
                        var members = {}
                        Object.keys(data.users).forEach((k) => {
                          members[k] = {
                            displayName: data.users[k].displayName,
                            photoURL: data.users[k].photoURL
                          }
                        })
                        firebase
                          .database()
                          .ref(`/conversations/${request.id}/data`)
                          .set({members});
                      });
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
          })
        ) : (
          <div className="noRequests">
            <h2>
              You have no pending requests, go create some connections yourself
            </h2>
          </div>
        )}
      </ul>
    );
  }
}
