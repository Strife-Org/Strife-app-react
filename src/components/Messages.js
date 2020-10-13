import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Message from "./Message";
import Loader from "react-loader-spinner";

import styles from "./styles/Messages.module.css";

class Messages extends React.Component {
  db = firebase.firestore();
  unsubscribe;

  state = {
    messages: [],
    isLoading: true,
  };

  newConversationData = (querySnapshot) => {
    var messages = [];
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      data.id = doc.id;
      messages.push(data);
    });
    messages.reverse()
    this.setState({ messages: messages, isLoading: false });
  };

  componentDidMount() {
    this.unsubscribe = this.db
      .collection("connections")
      .doc(this.props.conversationId)
      .collection("messages")
      .orderBy("sentAt", "desc")
      .limit(20)
      .onSnapshot(this.newConversationData);
  }

  componentDidUpdate() {
    this.unsubscribe();
    this.unsubscribe = this.db
      .collection("connections")
      .doc(this.props.conversationId)
      .collection("messages")
      .orderBy("sentAt", "desc")
      .limit(20)
      .onSnapshot(this.newConversationData);
  }

  render() {
    if (this.props.conversationId) {
      return this.state.isLoading ? (
        <Loader
              type="TailSpin"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={5000} //3 secs
            />
      ) : (
        <ul className={styles.msgContainer}>
          {this.state.messages.map((message) => {
            return (
              <Message
                key={message.id}
                isOwner={firebase.auth().currentUser.uid === message.owner}
                text={message.text}
              />
            );
          })}
        </ul>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Messages;
