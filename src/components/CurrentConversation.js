import React, { Component } from "react";
import Loader from "react-loader-spinner";

import firebase from "firebase/app";
import "firebase/database";

import Messages from "./Messages";
import MessageForm from "./MessageForm";
import CurrentConversationBar from "./CurrentConversationBar";
import "../styles/main_currentconversation.css";

export default class CurrentConversation extends Component {
  state = {
    currentConversation: "",
    messages: {},
    conversationsData: {},
    listeners: [],
    loading: false,
    contentEditableHeight: 46,
  };
  database = firebase.database();

  async componentDidUpdate(newProps) {
    if (!this.state.messages[newProps.conversationId]) {
      var conversations = this.state.messages;
      conversations[newProps.conversationId] = {};
      this.setState({ conversations: conversations });
    }
    if (newProps.conversationId !== this.state.currentConversation) {
      this.setState({ currentConversation: newProps.conversationId });
      if (newProps.conversationId !== "!exists") {
        const conversationRef = this.database.ref(
          "/conversations/" + newProps.conversationId
        );
        const messagesRef = conversationRef.child("messages");
        const conversationDataRef = conversationRef.child("data");
        var listeners = this.state.listeners;
        conversationDataRef.once("value").then((snapshot) => {
          var data = snapshot.val();
          delete data.members[firebase.auth().currentUser.uid];
          data.user = data.members[Object.keys(data.members)[0]];
          console.log(data.user);
          var state = {};
          state.conversationsData = this.state.conversationsData;
          state.conversationsData[this.props.conversationId] = data;
        });
        listeners.push(
          [
            messagesRef
              .orderByChild("sentAt")
              .on("child_added", (snapshot, b) => {
                var data = {};
                data.conversations = this.state.messages;
                data.conversations[newProps.conversationId] =
                  data.conversations[newProps.conversationId] || {};
                data.conversations[newProps.conversationId][
                  snapshot.key
                ] = snapshot.val();
                this.setState(data);
              }),
          ],
          conversationDataRef.on("child_changed", (snapshot, b) => {
            console.log(snapshot.val());
          })
        );
        this.setState({ listeners });
      }
    }
  }

  render() {
    if (this.state.currentConversation === "!exists") {
      return <div>No conversations</div>;
    } else if (this.props.conversationId) {
      return (
        <div className="currentConversation">
          {this.state.conversationsData[this.props.conversationId] ? (
            <CurrentConversationBar
              displayName={
                this.state.conversationsData[this.props.conversationId].user
                  .displayName
              }
              photoURL={
                this.state.conversationsData[this.props.conversationId].user
                  .profileURL
              }
            />
          ) : (
            <div>Loading</div>
          )}
          {this.state.messages[this.props.conversationId] ? (
            <Messages contentEditableHeight={this.state.contentEditableHeight} data={this.state.messages[this.props.conversationId]} />
          ) : (
            <div>Loading...</div>
          )}
          <MessageForm
            contentEditableHeight={this.state.contentEditableHeight}
            setContentEditableHeight={(height) => {
              this.setState({ contentEditableHeight: height });
            }}
            conversationId={this.props.conversationId}
          />
        </div>
      );
    } else {
      return (
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      );
    }
  }
}
