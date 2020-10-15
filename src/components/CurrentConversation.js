import React, { Component } from "react";
import Messages from "./Messages";
import MessageForm from "./MessageForm";
import Loader from "react-loader-spinner";
import firebase from "firebase/app";
import "firebase/database";

export default class CurrentConversation extends Component {
  state = {
    currentConversation: "",
    conversations: {},
    listeners: [],
    loading: false
  };
  database = firebase.database();
  componentDidMount() {
    if (this.props.conversationId) {
      this.setState({ currentConversation: this.props.conversationId });
      if (this.props.conversationId !== "!exists") {
        const conversationRef = this.database.ref(
          "/conversations/" + this.props.conversationId
        );
        var listeners = this.state.listeners;
        listeners.push(
          conversationRef
            .orderByChild("sentAt")
            .on("child_added", (snapshot, b) => {
              console.log(snapshot);
              var data = {};
              data.conversations = this.state.conversations;
              data.conversations[this.props.conversationId] =
                data.conversations[this.props.conversationId] || {};
              data.conversations[this.props.conversationId][
                snapshot.key
              ] = snapshot.val();
              this.setState(data);
            })
        );
        this.setState({ listeners });
      }
    }
  }

  async componentDidUpdate(newProps) {
    if(!this.state.conversations[newProps.conversationId]) {
      var conversations = this.state.conversations
      conversations[newProps.conversationId] = {}
      this.setState({ conversations: conversations})
    }
    if (newProps.conversationId !== this.state.currentConversation) {
      this.setState({ currentConversation: newProps.conversationId });
      if (newProps.conversationId !== "!exists") {
        const conversationRef = this.database.ref(
          "/conversations/" + newProps.conversationId
        );
        var listeners = this.state.listeners;
        listeners.push(
          conversationRef
            .orderByChild("sentAt")
            .on("child_added", (snapshot, b) => {
              var data = {};
              data.conversations = this.state.conversations;
              data.conversations[newProps.conversationId] =
                data.conversations[newProps.conversationId] || {};
              data.conversations[newProps.conversationId][
                snapshot.key
              ] = snapshot.val();
              this.setState(data);
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
        <div>
          {this.state.conversations[this.props.conversationId] ? (
            <Messages
              data={this.state.conversations[this.props.conversationId]}
            />
          ) : (
            <div>Loading...</div>
          )}
          <MessageForm conversationId={this.props.conversationId} />
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
