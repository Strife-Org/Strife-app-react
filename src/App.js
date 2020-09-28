import React, { Component } from "react";
import CustomRouter from "./components/CustomRouter";
const { ipcRenderer } = window.require("electron");
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
