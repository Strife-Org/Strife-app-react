import React, { Component } from "react";
import LoginButton from "./LoginButton";
import Logo from "./Logo";

export default class Login extends Component {
  render() {
    return (
      <div>
        <h1>Log In</h1>
        <LoginButton provider="github" />
        <LoginButton provider="google" />
        <Logo />
      </div>
    );
  }
}
