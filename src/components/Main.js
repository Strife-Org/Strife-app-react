import React from "react";
import OwnUserData from "./main/OwnUserData";
import Conversations from "./main/Conversations";
import CurrentConversation from "./main/CurrentConversation";

export default function Main(props) {
    return (
      <div className="container">
        <OwnUserData />
        <Conversations />
        <CurrentConversation />
      </div>
    );
  }