import React, { Component } from "react";
import Loader from "react-loader-spinner";

import firebase from "firebase/app";
import "firebase/database";

import Messages from "./Messages";
import MessageForm from "./MessageForm";
import CurrentConversationBar from "./CurrentConversationBar";
import ManageConnections from "./ManageConnections";
import { FaArrowRight } from "react-icons/fa";

import "../styles/main_currentconversation.css";

export default class CurrentConversation extends Component {
  state = {
    currentConveration: "",
    messages: {},
    conversationsData: {},
    listeners: [],
    loading: false,
    contentEditableHeight: 46,
  };
  database = firebase.database();

  async componentDidUpdate() {
    if (!this.state.messages[this.props.conversationId]) {
      var conversations = this.state.messages;
      conversations[this.props.conversationId] = {};
      this.setState({ conversations: conversations });
    }
    if (this.props.conversationId !== this.state.currentConversation) {
      this.setState({ currentConversation: this.props.conversationId });
      if (
        this.props.conversationId &&
        this.props.conversationId !== "!exists"
      ) {
        const conversationRef = this.database.ref(
          "/conversations/" + this.props.conversationId
        );
        const messagesRef = conversationRef.child("messages");
        var listeners = this.state.listeners;
        const connection = this.props.existingConnections.find(
          (connection) => connection.id === this.props.conversationId
        );
        if (!connection) {
          var d = {
            user: {
              displayName: "Conversation Not Found",
              photoURL:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.archgard.com%2Fassets%2Fupload_fallbacks%2Fimage_not_found-54bf2d65c203b1e48fea1951497d4f689907afe3037d02a02dcde5775746765c.png&f=1&nofb=1",
            },
          };
          var s = {};
          s.conversationsData = this.state.conversationsData;
          s.conversationsData[this.props.conversationId] = d;
          this.setState(s);
          console.log(this.props.conversationId);
          return console.error("conversation not found");
        } else {
          var data = connection;
          delete data.users[firebase.auth().currentUser.uid];
          data.user = data.users[Object.keys(data.users)[0]];
          window.titleBar.updateTitle(`${data.user.displayName} - Strife Chat`);
          var state = {};
          state.conversationsData = this.state.conversationsData;
          state.conversationsData[this.props.conversationId] = data;
          this.setState(state);
        }

        listeners.push(
          messagesRef
            .orderByChild("sentAt")
            .on("child_added", (snapshot, b) => {
              var data = {};
              data.conversations = this.state.messages;
              data.conversations[this.props.conversationId] =
                data.conversations[this.props.conversationId] || {};
              data.conversations[this.props.conversationId][
                snapshot.key
              ] = snapshot.val();
              this.setState(data);
            })
        );
        this.setState({ listeners });
      } else {
        if (document.title !== "Strife Chat")
          window.titleBar.updateTitle("Strife Chat");
      }
    }
  }

  render() {
    if (this.state.currentConversation === "!exists") {
      return (
        <div className="noConversations">
          <div className="notFoundBar"></div>
          <div className="notFoundContent">
            <h2>
              No conversations found, create some by clicking here <FaArrowRight /><ManageConnections existingConnections={this.props.existingConnections} />
            </h2>
          </div>
        </div>
      );
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
                  .photoURL
              }
            />
          ) : (
            <Loader
              type="TailSpin"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          )}
          {typeof this.state.messages[this.props.conversationId] ===
          "object" ? (
            <Messages
              contentEditableHeight={this.state.contentEditableHeight}
              data={this.state.messages[this.props.conversationId]}
            />
          ) : (
            <Loader
              type="TailSpin"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
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
