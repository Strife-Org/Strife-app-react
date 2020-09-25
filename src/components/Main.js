import React, { Component } from "react";
import OwnUserData from "./main/OwnUserData";
import Conversations from "./main/Conversations";
import CurrentConversation from "./main/CurrentConversation";

export default class Main extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="container">
        <OwnUserData />
        <Conversations />
        <CurrentConversation />
      </div>
    );
  }
}
