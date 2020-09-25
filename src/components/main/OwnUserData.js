import React from "react";
import {
  FirebaseAuthConsumer,
} from "@react-firebase/auth";
import SignoutButton from '../SignoutButton'

export default function OwnUserData(props) {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user, providerId }) => {
        console.log(isSignedIn);
        console.log(user);
        console.log(providerId);
        return (
          <div className="own-user-data">
            <img
              src={user.photoURL}
              alt="Own Profile"
              height="32"
              className="profileImg"
            />
            <h2 className="userName">{user.displayName || user.username}</h2>
            <SignoutButton />
          </div>
        );
      }}
    </FirebaseAuthConsumer>
  );
}
