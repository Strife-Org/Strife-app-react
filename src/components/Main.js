import React, { Component } from "react";
import OwnUserData from "./OwnUserData";
import Connections from "./Connections";
import CurrentConversation from "./CurrentConversation";
import firebase from "firebase/app";
import "firebase/firestore";

import "../styles/main.css";
export default class Main extends Component {
  state = {
    currentConversation: "",
    existingConnections: [],
  };

  unsubscribe;

  async componentDidMount() {
    if (!firebase.auth().currentUser) {
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
              otherUser.id = Object.keys(data.users)[0];
              var connection = doc.data();
              connection.id = doc.id;
              connection.user = otherUser;
              existingConnections.push(connection);
            }
            if (doc.data().accepted === 1 && latestConnection === null) {
              latestConnection = doc.id;
            }
          });
          this.setState({
            currentConversation: latestConnection || "!exists",
            existingConnections,
          });
        });

      this.unsubscribe = firebase
        .firestore()
        .collection("connections")
        .where(`users.${firebase.auth().currentUser.uid}.exists`, "==", true)
        .onSnapshot((response) => {
          var existingConnections = [];
          const ownUserId = firebase.auth().currentUser.uid;
          response.forEach((doc) => {
            if (doc.exists) {
              var data = doc.data();
              delete data.users[ownUserId];
              var otherUser = data.users[Object.keys(data.users)[0]];
              otherUser.id = Object.keys(data.users)[0];
              var connection = doc.data();
              connection.id = doc.id;
              connection.user = otherUser;
              existingConnections.push(connection);
            }
          });
          this.setState({
            existingConnections,
          });
        });
    } else {
      const u = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase
            .firestore()
            .collection("connections")
            .where(
              `users.${firebase.auth().currentUser.uid}.exists`,
              "==",
              true
            )
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
                  otherUser.id = Object.keys(data.users)[0];
                  var connection = doc.data();
                  connection.id = doc.id;
                  connection.user = otherUser;
                  existingConnections.push(connection);
                }
                if (doc.data().accepted === 1 && latestConnection === null) {
                  latestConnection = doc.id;
                }
              });
              this.setState({
                currentConversation: latestConnection || "!exists",
                existingConnections,
              });
            });

          this.unsubscribe = firebase
            .firestore()
            .collection("connections")
            .where(
              `users.${firebase.auth().currentUser.uid}.exists`,
              "==",
              true
            )
            .onSnapshot((response) => {
              var existingConnections = [];
              const ownUserId = firebase.auth().currentUser.uid;
              response.forEach((doc) => {
                if (doc.exists) {
                  var data = doc.data();
                  delete data.users[ownUserId];
                  var otherUser = data.users[Object.keys(data.users)[0]];
                  otherUser.id = Object.keys(data.users)[0];
                  var connection = doc.data();
                  connection.id = doc.id;
                  connection.user = otherUser;
                  existingConnections.push(connection);
                }
              });
              if(!existingConnections.find(connection => connection.id === this.state.currentConversation)) {
                var latestConnection = "!exists";
                existingConnections.every(connection => {
                  if(connection.accepted === 1) return latestConnection = connection.id;
                  return true;
                })
                this.setState({currentConversation: latestConnection})
              }
              this.setState({
                existingConnections,
              });
            });
            u();
        }
      });
    }

    window.setCurrentConversation = (id) => {
      if (this.state.currentConversation !== id) {
        this.setState({ currentConversation: id });
      }
    };
  }
  
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="main">
        <OwnUserData existingConnections={this.state.existingConnections} />
        <Connections
          changeConversationId={(newId) => {
            if (this.state.currentConversation !== newId) {
              this.setState({ currentConversation: newId });
            }
          }}
          existingConnections={this.state.existingConnections}
        />
        <CurrentConversation existingConnections={this.state.existingConnections} conversationId={this.state.currentConversation} />
      </div>
    );
  }
}
