import Icon from "./Icon";
import React from "react";

export default function SignoutButton() {
  return (
    <button className="signout" onClick={(e) => {
        e.preventDefault();
        window.signout()
    }}>
      <Icon icon="signout" />
    </button>
  );
}
