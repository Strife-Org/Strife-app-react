import React from "react";
import ReactGA from "react-ga";
import Icon from "../Icon";

export default function LoginButton(props) {
  function handleClick() {
    props.onLoginRequest("");
    ReactGA.event({
      category: "User",
      action: "Login button click",
    });
  }
  return (
    <button onClick={handleClick}>
      <Icon icon="github" />
      Log-in with github
    </button>
  );
}
