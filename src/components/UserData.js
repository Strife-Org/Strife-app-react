import React from 'react'

export default function UserData({displayName, photoURL}) {
    return (
        <span class="userData">
            <img
              src={photoURL}
              alt={`${displayName}'s profile`}
              height="32"
              className="profilePic"
            />
            <h2
            className="displayName"
            >{displayName}</h2>
        </span>
    )
}
