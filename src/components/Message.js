import React, { useState } from "react";
import styles from "./styles/Message.module.css";
import classNames from "classnames";
import firebase from "firebase/app";
import "firebase/storage";
import { saveAs } from "file-saver";

import {markdown} from "markdown";

function Message(props) {
  var [bytes, setBytes] = useState("");
  var [fileType, setFileType] = useState();
  var fileName;
  if (props.file) {
    const fileRef = firebase.storage().refFromURL(props.file);
    fileName = fileRef.name;
    fileRef.getMetadata().then((metadata) => {
      setBytes(metadata.size);
      setFileType(metadata.contentType);
    });
  }
  return (
    <div
      className={classNames(
        styles.message,
        props.isOwner ? styles.own : styles.other
      )}
    >
      {props.file ? (
        <a
          style={{ color: "white" }}
          href={props.file}
          download={fileName}
          onClick={(e) => {
            e.preventDefault();
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
              var blob = xhr.response;
              saveAs(blob, fileName);
            };
            xhr.open("GET", props.file);
            xhr.send();
          }}
        >
          {fileType && fileType.startsWith("image") ? (
            (<div><img alt="Received" src={props.file} style={{maxWidth: "40vw"}} /></div>)
          ) : null}
          {bytes} bytes {fileName}
        </a>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(props.text) }}></div>
    </div>
  );
}

export default Message;
