import React, { useState, useRef, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Message from "./Message";

export default function Messages(props) {
  const scrollIntoView = useRef();
  const [bottom, setBottom] = useState(true);

  useEffect(() => {
    if (scrollIntoView.current && bottom) {
      scrollIntoView.current.scrollIntoView();
    }
  });

  return (
    <div className="messagesContainer">
      <ul
        className="messages"
        style={{
          height: `calc(100vh - ${props.contentEditableHeight + 64}px)`,
        }}
        onScroll={(e) => {
          let tBottom =
            Math.floor(e.target.scrollTop) ===
            e.target.scrollHeight - e.target.offsetHeight;
          if (tBottom !== bottom) setBottom(tBottom);
        }}
      >
        {Object.keys(props.data).map((key) => {
          const message = props.data[key];
          return (
            <Message
              key={key}
              isOwner={firebase.auth().currentUser.uid === message.owner}
              text={message.text}
              file={message.file}
            />
          );
        })}
        <div className="scrollIntoView" ref={scrollIntoView}></div>
      </ul>
    </div>
  );
}
