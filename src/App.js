import React, { Component } from "react";
import CustomRouter from "./components/CustomRouter";
import ReactGA from "react-ga";
const { ipcRenderer } = window.require("electron");
ReactGA.initialize("UA-178747021-2");

export default class App extends Component {
  constructor(props) {
    super();

    this.state = {
      savedData: props.savedData,
      userData: {
        _id: "",
        GithubData: {
          displayName: "",
          username: "",
          photos: [
            {
              value: "",
            },
          ],
        },
      },
    };
  }

  setSavedData(savedData) {
    ipcRenderer.send("save-config", savedData);
    this.setState({ savedData: savedData });
  }

  render() {
    return (
      <CustomRouter/>
    );
  }
}
