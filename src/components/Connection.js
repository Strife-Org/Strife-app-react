import React from 'react'

export default function Connection({data, onClick}) {
    return (
        <button onClick={onClick}>
            <img
              src={data.user.photoURL}
              alt={`${data.user.displayName}'s profile`}
              height="32"
            />
            <h2>{data.user.displayName}</h2>
        </button>
    )
}
