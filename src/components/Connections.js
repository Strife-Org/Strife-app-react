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
        var data = doc.data()
        data.id = doc.id
        delete data.users[firebase.auth().currentUser.uid]
        data.user = data.users[Object.keys(data.users)[0]]
        data.user.id = Object.keys(data.users)[0]
      connections.push(data);
    });
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
    const connectionsList = this.state.connections.map((connection) => (
      <li key={connection.id}>
        <Connection data={connection} onClick={() => this.props.changeConversationId(connection.id)} />
      </li>
    ));
    return <ul>{connectionsList}</ul>;
  }
}
