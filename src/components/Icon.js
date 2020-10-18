import React from "react";

export default function Icon(props) {
  return (
    <img
      className={props.className}
      onClick={props.onClick}
      src={`./icons/${props.icon}.svg`}
      alt=""
      width="24"
      height="24"
      viewBox="0 0 24 24"
    />
  );
}
