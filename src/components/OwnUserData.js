import React from "react";
import {
  FirebaseAuthConsumer,
} from "@react-firebase/auth";
import SignoutButton from './SignoutButton'
import AddContact from './AddContact'
import ConnectionRequestsButton from './ConnectionRequestsButton'

import styles from "./styles/OwnUserData.module.css"

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
              className={styles.profileImg}
            />
            <h2 className={styles.displayName}>{user.displayName || user.username}</h2>
            <SignoutButton />
            <AddContact />
            <ConnectionRequestsButton />
          </div>
        );
      }}
    </FirebaseAuthConsumer>
  );
}
