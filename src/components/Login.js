import React, { Component } from "react";
import LoginButton from "./LoginButton";
import Logo from "./Logo";
import styles from "./styles/Login.module.css";

export default class Login extends Component {
  render() {
    return (
      <div className={styles.loginContainer}>
        <h1 className={styles.loginText}>Log In</h1>
        <LoginButton provider="github" />
        <LoginButton provider="google" />
        <Logo />
      </div>
    );
  }
}
