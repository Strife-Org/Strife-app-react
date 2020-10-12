import React from 'react'

import styles from "./styles/Connection.module.css"

export default function UserData({displayName, photoURL}) {
    return (
        <span>
            <img
              src={photoURL}
              alt={`${displayName}'s profile`}
              height="32"
              className={styles.profileImg}
            />
            <h2 className={styles.displayName} >{displayName}</h2>
        </span>
    )
}
