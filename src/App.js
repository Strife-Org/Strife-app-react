import React, { Component } from "react";
import CustomRouter from "./components/CustomRouter";
import ReactGA from "react-ga";
const { ipcRenderer } = window.require("electron");
ReactGA.initialize("UA-178747021-2");

export default class App extends Component {
  constructor(props) {
    super();

    window.socket.on("authenticated", (apiKey) => {
      var data = this.state.userData.userData;
      data.apiKey = apiKey;
      this.setUserData(data)
    })

    this.state = { userData: props.userData };
  }

  setUserData(userData) {
    console.log("a")
    ipcRenderer.send("save-config", userData)
    this.setState({userData: userData})
  }

  render() {
    return (
      <CustomRouter
        userData={this.state.userData}
        onLogout={() => {
          var data = this.state.userData;
          data.apiKey = undefined;
          this.setState({ userData: data });
        }}
      />
    );
  }
}
