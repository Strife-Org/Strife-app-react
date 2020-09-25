import React, { Component } from "react";
import LoginButton from "./login/LoginButton";
import Logo from "./Logo";
import '../css/login.css'
const { ipcRenderer } = window.require("electron");

var keysRequested = false;
var opened = false;

export default class Login extends Component {
  constructor(props) {
    super();
    window.socket.on("keys", (k) => {
      if (!opened) {
        ipcRenderer.send(
          "external",
          props.savedData.serverUrl + "auth/github?k=" + k
        );
        opened = true
        setTimeout(() => {opened = false}, 1000)
      }

      keysRequested = false;
    });
  }

  handleLoginRequest() {
    if (!keysRequested) {
      window.socket.emit("keyRequest");
      keysRequested = true;
    }
    console.log("r");
  }

  render() {
    return (
      <div className="loginContainer">
        <h1 className="loginText">Log In</h1>
        <LoginButton onLoginRequest={this.handleLoginRequest} />
        <Logo />
      </div>
    );
  }
}
