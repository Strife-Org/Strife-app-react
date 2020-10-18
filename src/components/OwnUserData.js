import React from "react";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import SignoutButton from "./SignoutButton";
import ManageContact from "./ManageContacts";
import Popup from "reactjs-popup";
import {FaCog} from "react-icons/fa";

const settings = [
  ManageContact,
  SignoutButton,
];

export default function OwnUserData(props) {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user, providerId }) => {
        return (
          <div className="ownUserDataContainer">
            <div className="ownUserData">
              <img
                src={user.photoURL}
                alt="Own Profile"
                height="32"
                className="ownProfilePic"
              />
              <h2 className="ownName">{user.displayName}</h2>

              <Popup
                trigger={(open) => (
                  <button className="settingsButton">
                    <FaCog viewBox="0 0 500 500" className="icon settingsIcon" icon="Cog" />
                  </button>
                )}
                position="bottom left"
                closeOnDocumentClick
              >
                <ul className="settings">
                  {settings.map((setting) => (
                    <li className="setting" key={setting.name}>{React.createElement(setting)}</li>
                  ))}
                </ul>
              </Popup>
            </div>
          </div>
        );
      }}
    </FirebaseAuthConsumer>
  );
}
