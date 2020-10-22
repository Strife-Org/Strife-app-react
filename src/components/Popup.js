import react from "react";
import React, { useState } from "react";
import ReactDOM from "react-dom";

export default function Popup(props) {
  const [visible, setVisible] = useState(false);
  var popupRoot = document.getElementById("ownPopupRoot");
  if (!popupRoot) {
    popupRoot = document.createElement("div");
    popupRoot.id = "ownPopupRoot";
    document.body.appendChild(popupRoot);
  }

  const close = props.afterClose
    ? () => {
        changeVisible(false);
        props.afterClose();
      }
    : () => {
        changeVisible(false);
      };
  var popupInner;
  if (typeof props.children === "function") {
    popupInner = props.children(close);
  } else {
    popupInner = props.children;
  }
  var popupContent;

  const changeVisible = (newV) => {
    if (newV !== visible) {
      if (!newV) {
        console.log("false");
        popupRoot.classList.remove("visible");
        popupContent = null;
        console.log(popupContent);
        ReactDOM.render(popupContent, popupRoot);
        setVisible(false);
      } else {
        console.log(setVisible(true));
        popupRoot.classList.add("visible");
        popupContent = (
          <div className="popupInner">
            <button
              onClick={() => {
                popupRoot.classList.remove("visible");
                popupContent = null;
                console.log(popupContent);
                ReactDOM.render(popupContent, popupRoot);
                setVisible(false);
              }}
              className="modalClose"
            >
              &times;
            </button>
            {popupInner}
          </div>
        );
        setVisible(true);
        ReactDOM.render(popupContent, popupRoot);
      }
    }
  };

  return react.cloneElement(props.trigger, {
    onClick: () => {
      console.log("clicked");
      changeVisible(true);
    },
  });
}
