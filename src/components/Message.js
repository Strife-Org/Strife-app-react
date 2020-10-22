import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import { saveAs } from "file-saver";

import classnames from "classnames";

import Popup from "./Popup"
import Markdown from "./Markdown"

function Message(props) {
  var [bytes, setBytes] = useState("");
  var [fileType, setFileType] = useState();
  var fileName;
  if (props.file) {
    const fileRef = firebase.storage().refFromURL(props.file);
    const path = fileRef.fullPath;
    var width, height;
    if (path.substr(29, 6) === "images") {
      const result = path.match(/^[^/]+\/images\/[^/]+\/(\d+)\/(\d+)\/.+$/);
      width = result[1];
      height = result[2];
    }
    fileName = fileRef.name;
    fileRef.getMetadata().then((metadata) => {
      setBytes(metadata.size);
      setFileType(metadata.contentType);
    });
  }
  var bytesText = "";
  if (bytes < 1024) {
    bytesText = `${bytes} bytes`;
  } else if (bytes < 1048576) {
    bytesText = `${(bytes / 1024).toFixed(2)} kb`;
  } else {
    bytesText = `${(bytes / 1048576).toFixed(2)} mb`;
  }
  return (
    <div className={classnames("message", props.isOwner ? "own" : "other")}>
      {props.file ? (
        <div>
          {fileType && fileType.startsWith("image") ? (
            <Popup trigger={
            <div
              style={{
                display: "block",
                width: width,
                height: Math.min(height, window.screen.height * 0.4),
              }}
            >
              <img alt="Received" src={props.file} />
            </div>}><img alt="Received" className="full" src={props.file} /></Popup>
          ) : null}
          <a
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
            <span className="byteCount">{bytesText}</span> {fileName}
          </a>
        </div>
      ) : null}
      <Markdown>{props.text}</Markdown>
    </div>
  );
}

export default Message;
