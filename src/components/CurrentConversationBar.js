import React from 'react'
import UserData from "./UserData"

export default function CurrentConversationBar({displayName, photoURL}) {
    return (
        <div className="currentConversationBar">
            <UserData displayName={displayName} photoURL={photoURL} />
        </div>
    )
}