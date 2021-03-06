import React, { Component } from "react";
import Popup from "reactjs-popup";
import firebase from "firebase/app";
import "firebase/storage";

import { v1 } from "uuid";
import { FaPaperclip } from "react-icons/fa";

export default class FileUploader extends Component {
  state = {
    file: null,
    comment: "",
    defaultComment: "",
  };

  componentDidMount() {
    this.setState({
      comment: this.props.commentDefault,
      defaultComment: this.props.commentDefault,
    });
  }
  componentDidUpdate() {
    if (this.props.commentDefault !== this.state.defaultComment) {
      this.setState({
        comment: this.props.commentDefault,
        defaultComment: this.props.commentDefault,
      });
    }
  }

  render() {
    return (
      <Popup
        trigger={
          <button className="fileButton">
            <FaPaperclip viewBox="0 0 500 500" className="icon fileIcon" />
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
                if (!file) return alert("No file selected");
                const fileName = file.name;
                
                const loadImage = () => {
                  var fr, img;
                  fr = new FileReader();
                  fr.onload = createImage;
                  fr.readAsDataURL(file);

                  let imageLoaded = () => {

                    // Points to the root reference
                    const storageRef = firebase.storage().ref();

                    // Points to 'userId/filename-uuid'
                    const userFolderRef = storageRef.child(
                      firebase.auth().currentUser.uid
                    );

                    const fileFolder = userFolderRef
                      .child('images')
                      .child(v1())
                      .child(img.width.toString())
                      .child(img.height.toString());

                    const fileRef = fileFolder.child(fileName);
                    fileRef.put(file).then((snapshot) => {
                      fileRef.getDownloadURL().then((url) => {
                        this.props.handleSending(url, this.state.comment);
                        close();
                      });

                      close();
                    });

                    // This next bit removes the image, which is obviously optional -- perhaps you want
                    // to do something with it!
                    img.parentNode.removeChild(img);
                    img = undefined;
                  }

                  function createImage() {
                    img = document.createElement("img");
                    img.onload = imageLoaded;
                    img.style.display = "none"; // If you don't want it showing
                    img.src = fr.result;
                    document.body.appendChild(img);
                  }
                }

                if (file.type.startsWith("image")) {
                  loadImage();
                } else {
                  // Points to the root reference
                  const storageRef = firebase.storage().ref();

                  // Points to 'userId/filename-uuid'
                  const userFolderRef = storageRef.child(
                    firebase.auth().currentUser.uid
                  );

                  const fileFolder = userFolderRef
                    .child('files')
                    .child(v1());

                  const fileRef = fileFolder.child(fileName);
                  fileRef.put(file).then((snapshot) => {
                    fileRef.getDownloadURL().then((url) => {
                      console.log(url);
                      this.props.handleSending(url, this.state.comment);
                      close();
                    });

                    close();
                  });
                }

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
