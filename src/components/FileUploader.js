import React, { Component } from "react";
import Popup from "reactjs-popup";
import Icon from "./Icon";

import firebase from "firebase/app";
import "firebase/storage";

import { v1 } from "uuid";

export default class FileUploader extends Component {
  state = {
    file: null,
    comment: ""
  };

  render() {
    return (
      <Popup
        trigger={
          <button className="button">
            <Icon icon="file" />
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <form
              action="#"
              onSubmit={(e) => {
                e.preventDefault();
                const file = this.state.file
                const fileName = file.name;

                const fileLocation = fileName + "-" + v1();

                // Points to the root reference
                const storageRef = firebase.storage().ref();

                // Points to 'userId/filename-uuid'
                const userFolderRef = storageRef.child(
                  firebase.auth().currentUser.uid
                );
                const fileRef = userFolderRef.child(fileLocation);

                fileRef.put(file).then((snapshot) => {
                  console.log(`Uploaded ${fileName} to ${fileLocation}`);
                  console.log(`Comment is ${this.state.comment}`)
                  close()
                });
              }}
            >
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  this.setState({ file });
                }}
              />
              <input type="text" name="comment" id="comment" placeholder="Comment" value={this.state.comment} onChange={(e) => {this.setState({ comment: e.target.value})}} />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </Popup>
    );
  }
}