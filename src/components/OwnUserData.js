import React from "react";
import {
  FirebaseAuthConsumer,
} from "@react-firebase/auth";
import SignoutButton from './SignoutButton'
import AddContact from './AddContact'
import ConnectionRequestsButton from './ConnectionRequestsButton'

export default function OwnUserData(props) {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user, providerId }) => {
        return (
          <div className="own-user-data">
            <img
              src={user.photoURL}
              alt="Own Profile"
              height="32"
            />
            <h2>{user.displayName || user.username}</h2>
            <SignoutButton />
            <AddContact />
            <ConnectionRequestsButton />
          </div>
        );
      }}
    </FirebaseAuthConsumer>
  );
}
