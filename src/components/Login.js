import React, { Component } from "react";
import LoginButton from "./login/LoginButton";
import Logo from "./Logo";

export default class Login extends Component {
  render() {
    return (
      <div className="loginContainer">
        <h1 className="loginText">Log In</h1>
        <LoginButton provider="github" />
        <LoginButton provider="google" />
        <Logo />
      </div>
    );
  }
}
