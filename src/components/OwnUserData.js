import React from "react";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import SignoutButton from "./SignoutButton";
import AddContact from "./AddContact";
import ConnectionRequestsButton from "./ConnectionRequestsButton";
import Popup from "reactjs-popup";
import Icon from './Icon'

const settings = [<AddContact />, <ConnectionRequestsButton />, <SignoutButton />]

export default function OwnUserData(props) {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user, providerId }) => {
        return (
          <div className="ownUserData">
            <img
              src={user.photoURL}
              alt="Own Profile"
              height="32"
              class="ownProfilePic"
            />
            <h2>{user.displayName || user.username}</h2>

            <Popup
              trigger={(open) => (
                <button className="button">
                  <Icon icon="Cog" />
                </button>
              )}
              position="bottom left"
              closeOnDocumentClick
            >
              <ul className="settings">
                {settings.map(setting => <li className="setting">{setting}</li>)}
              </ul>
            </Popup>
          </div>
        );
      }}
    </FirebaseAuthConsumer>
  );
}
