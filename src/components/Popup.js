import react from "react";
import React, { useState } from "react";

export default function Popup(props) {
  const [visible, setVisible] = useState(false);

  var popupInner;
  if (typeof props.children === "function") {
    popupInner = props.children(() => setVisible(false));
  }
  else 
  {
    popupInner = props.children
  };

  console.log(visible)

  return (
    <div>
      {react.cloneElement(props.trigger, {
        onClick: () => {
          console.log("a");
          setVisible(true);
        },
      })}
      {visible ? (
        <div className="popup">
          <div className="popupInner">
            <button onClick={() => {setVisible(false)}} className="modalClose">
              &times;
            </button>
            {popupInner}
          </div>
        </div>
      ) : null}
    </div>
  );
}
