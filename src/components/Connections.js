import React, { Component } from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import Connection from "./Connection";

export default class Conversations extends Component {
  db = firebase.firestore();

  state = {
    connections: [],
  };

  newConversationData = (querySnapshot) => {
    var connections = [];
    querySnapshot.forEach((doc) => {
        console.log(doc)
        var data = doc.data()
        data.id = doc.id
        delete data.users[firebase.auth().currentUser.uid]
        data.user = data.users[Object.keys(data.users)[0]]
        data.user.id = Object.keys(data.users)[0]
      connections.push(data);
    });
    console.log(connections);
    this.setState({ connections: connections });
  };

  componentDidMount() {
    this.db
      .collection("connections")
      .where("accepted", "==", true)
      .where(`users.${firebase.auth().currentUser.uid}.exists`, "==", true)
      .onSnapshot(this.newConversationData);
  }

  render() {
    console.log(this.state.connections);
    const connectionsList = this.state.connections.map((connection) => (
      <li key={connection.id}>
        <Connection data={connection} />
      </li>
    ));
    return <ul>{connectionsList}</ul>;
  }
}
