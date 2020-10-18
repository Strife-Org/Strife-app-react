import React, { Component } from "react";
import LoginButton from "./LoginButton";
import Logo from "./LoginLogo";
import '../styles/login.css'

export default class Login extends Component {
  render() {
    return (
      <div className="login">
      <div className="loader" />
      <div className="loginContainer">
        <h1 className="loginHeader">Log In</h1>
        <LoginButton provider="github" />
        <LoginButton provider="google" />
        <Logo />
      </div>
      </div>
    );
  }
}
