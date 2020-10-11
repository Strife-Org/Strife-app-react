import React from "react";
import Messages from "./Messages";
import MessageForm from "./MessageForm";
import Loader from "react-loader-spinner";

export default function CurrentConversation(props) {
  if (props.conversationId === "!exists") {
    return <div>No conversations</div>;
  } else if (props.conversationId) {
    return (
      <div>
        <Messages conversationId={props.conversationId} />
        <MessageForm conversationId={props.conversationId} />
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
