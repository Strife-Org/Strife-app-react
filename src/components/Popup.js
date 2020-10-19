import react from "react";
import React, { useState } from "react";

export default function Popup(props) {
  const [visible, setVisible] = useState(!!props.visible);

  const close = props.afterClose ? () => {
    setVisible(false)
    props.afterClose()
  } : () => {
    setVisible(false)
  }

  var popupInner;
  if (typeof props.children === "function") {
    popupInner = props.children(close);
  } else {
    popupInner = props.children;
  }

  return (
    <div>
      {react.cloneElement(props.trigger, {
        onClick: () => {setVisible(true)},
      })}
      {visible ? (
        <div className="popup">
          <div className="popupInner">
            <button
              onClick={close}
              className="modalClose"
            >
              &times;
            </button>
            {popupInner}
          </div>
        </div>
      ) : null}
    </div>
  );
}
