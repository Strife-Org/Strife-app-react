import React from 'react'

import styles from "../css/Connection.module.css"

export default function Connection({data}) {
    console.log(data)
    return (
        <div>
            <img
              src={data.user.photoURL}
              alt={`${data.user.displayName}'s profile`}
              height="32"
              className={styles.profileImg}
            />
            <h2 className={styles.displayName} >{data.user.displayName}</h2>
        </div>
    )
}
