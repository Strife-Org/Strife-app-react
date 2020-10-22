import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import { saveAs } from "file-saver";

import { markdown } from "markdown";

import classnames from "classnames";

function Message(props) {
  var [bytes, setBytes] = useState("");
  var [fileType, setFileType] = useState();
  var fileName;
  if (props.file) {
    const fileRef = firebase.storage().refFromURL(props.file);
    const path = fileRef.fullPath;
    var width, height;
    if (path.substr(29, 6) === "images") {
      const result = path.match(/^[^\/]+\/images\/[^\/]+\/(\d+)\/(\d+)\/.+$/);
      width = result[1];
      height = result[2];
      console.log(height)
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
          {fileType && fileType.startsWith("image") ? (
            <div
              style={{
                display: "block",
                width: width,
                height: Math.min(height, window.screen.height * 0.4)
              }}
            >
              <img alt="Received" src={props.file} />
            </div>
          ) : null}
          <span className="byteCount">{bytesText}</span> {fileName}
        </a>
      ) : null}
      <div
        dangerouslySetInnerHTML={{ __html: markdown.toHTML(props.text) }}
      ></div>
    </div>
  );
}

export default Message;
