import React from "react";
import OwnUserData from "./OwnUserData";
import Conversations from "./Conversations";
import CurrentConversation from "./CurrentConversation";

export default function Main(props) {
    return (
      <div className="container">
        <OwnUserData />
        <Conversations />
        <CurrentConversation />
      </div>
    );
  }