import React from "react";
import Main from "./Main";
import Login from "./Login";
import ReactGA from "react-ga";

export default function CustomRouter(props) {
  if (props.savedData.apiKey !== undefined) {
    ReactGA.pageview("/main");
    return <Main  savedData={props.savedData} onLogout={props.onLogout} />;
  } else {
    ReactGA.pageview("/login");
    return <Login savedData={props.savedData} />;
  }
}
