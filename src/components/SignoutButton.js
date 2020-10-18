import Icon from "./Icon";
import React from "react";

export default function SignoutButton() {
  return (
    <button className="settingButton signout" onClick={(e) => {
        e.preventDefault();
        window.signout()
    }}>
      <Icon icon="signout" /> Signout
    </button>
  );
}
