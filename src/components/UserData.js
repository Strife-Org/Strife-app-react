import React from 'react'

export default function UserData({displayName, photoURL}) {
    return (
        <span>
            <img
              src={photoURL}
              alt={`${displayName}'s profile`}
              height="32"
            />
            <h2>{displayName}</h2>
        </span>
    )
}
