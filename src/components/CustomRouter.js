import React from "react";
import Main from "./Main";
import Login from "./Login";
import ReactGA from "react-ga";

export default function CustomRouter(props) {
  if (props.userData.apiKey !== undefined) {
    ReactGA.pageview("/main");
    return <Main  userData={props.userData} onLogout={props.onLogout} />;
  } else {
    ReactGA.pageview("/login");
    return <Login userData={props.userData} />;
  }
}
