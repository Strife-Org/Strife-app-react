import {FaSignOutAlt} from "react-icons/fa";
import React from "react";

export default function SignoutButton() {
  return (
    <button className="settingButton signout" onClick={(e) => {
        e.preventDefault();
        window.signout()
    }}>
      <FaSignOutAlt className="icon" viewBox="0 0 500 500" /><span> Signout</span>
    </button>
  );
}
