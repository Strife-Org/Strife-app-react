import React from "react";
import ReactGA from "react-ga";
import Icon from "../Icon";
import '../../css/login.css'

export default function LoginButton(props) {
  function handleClick() {
    props.onLoginRequest("");
    ReactGA.event({
      category: "User",
      action: "Login button click",
    });
  }
  return (
    <button onClick={handleClick} className="loginBox github">
      <Icon icon="github" />
      Log-in with github
    </button>
  );
}
