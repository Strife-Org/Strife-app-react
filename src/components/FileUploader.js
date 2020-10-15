import React, { Component } from "react";
import Popup from "reactjs-popup";
import Icon from "./Icon";

import firebase from "firebase/app";
import "firebase/storage";

import { v1 } from "uuid";

function splitFileName(full) {
  const split = full.split('.')
  const end = split[split.length-1]
  const start = encodeURIComponent(full.substring(0, full.length - end.length - 1))
  return {name: start, ext: end}
}

export default class FileUploader extends Component {
  state = {
    file: null,
    comment: "",
    defaultComment: ""
  };

  componentDidMount() {
    this.setState({ comment: this.props.commentDefault, defaultComment: this.props.commentDefault });
  }
  componentDidUpdate() {
    if (this.props.commentDefault !== this.state.defaultComment) {
      this.setState({ comment: this.props.commentDefault, defaultComment: this.props.commentDefault });
    }
  }

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
                const file = this.state.file;
                const {name, ext} = splitFileName(file.name)
                

                const storageFileName = name + "@" + v1() + "." + ext;

                // Points to the root reference
                const storageRef = firebase.storage().ref();

                // Points to 'userId/filename-uuid'
                const userFolderRef = storageRef.child(
                  firebase.auth().currentUser.uid
                );
                const fileRef = userFolderRef.child(storageFileName);

                fileRef.put(file).then((snapshot) => {

                  fileRef.getDownloadURL().then(url => {
                    this.props.handleSending(url, this.state.comment)
                    close();
                  })

                  close();
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
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="Comment"
                value={this.state.comment}
                onChange={(e) => {
                  this.setState({ comment: e.target.value });
                }}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </Popup>
    );
  }
}
