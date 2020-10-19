import React, { Component } from "react";
import OwnUserData from "./OwnUserData";
import Conversations from "./Connections";
import CurrentConversation from "./CurrentConversation";
import firebase from "firebase/app";
import "firebase/firestore";

import "../styles/main.css";
export default class Main extends Component {
  state = {
    currentConversation: "",
    existingConnections: [],
  };

  async componentDidMount() {
    if (this.state.currentConversation === "") {
      firebase
        .firestore()
        .collection("connections")
        .where(`users.${firebase.auth().currentUser.uid}.exists`, "==", true)
        .get()
        .then((response) => {
          var existingConnections = [];
          var latestConnection = null;
          const ownUserId = firebase.auth().currentUser.uid;
          response.forEach((doc) => {
            if (doc.exists) {
              var data = doc.data();
              delete data.users[ownUserId];
              var otherUser = data.users[Object.keys(data.users)[0]];
              otherUser.id = Object.keys(data.users)[0]
              var connection = doc.data()
              connection.id = doc.id;
              connection.user = otherUser
              existingConnections.push(connection);
            }
            if (doc.data().accepted && !latestConnection) {
              latestConnection = doc.id;
            }
          });
          this.setState({
            currentConversation: latestConnection || "!exists",
            existingConnections,
          });
        });
    }
    window.setCurrentConversation = (id) => {
      if (this.state.currentConversation !== id) {
        this.setState({ currentConversation: id });
      }
    };
  }

  render() {
    return (
      <div className="main">
        <OwnUserData existingConnections={this.state.existingConnections} />
        <Conversations
          changeConversationId={(newId) => {
            if (this.state.currentConversation !== newId) {
              this.setState({ currentConversation: newId });
            }
          }}
        />
        <CurrentConversation conversationId={this.state.currentConversation} />
      </div>
    );
  }
}
