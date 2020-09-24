import React, { Component } from "react";
import CustomRouter from "./components/CustomRouter";
import ReactGA from "react-ga";
import axios from "axios";
const { ipcRenderer } = window.require("electron");
ReactGA.initialize("UA-178747021-2");

export default class App extends Component {
  constructor(props) {
    super();

    window.socket.on("authenticated", (apiKey) => {
      var data = this.state.savedData;
      data.apiKey = apiKey;
      this.setSavedData(data);
    });

    this.state = { savedData: props.savedData, userData: {} };
    if (this.state.savedData.apiKey) {
      axios.get(this.state.savedData.serverUrl + "api/v1/user/", {
        params: {
          apiKey: this.state.savedData.apiKey
        },
      }).then((response) => {
        console.log(response)
      })
    }
  }

  setSavedData(savedData) {
    console.log("a");
    ipcRenderer.send("save-config", savedData);
    this.setState({ savedData: savedData });
  }

  render() {
    return (
      <CustomRouter
        savedData={this.state.savedData}
        userData={this.state.userData}
        onLogout={() => {
          var data = this.state.savedData;
          data.apiKey = undefined;
          this.setSavedData(data);
        }}
      />
    );
  }
}
