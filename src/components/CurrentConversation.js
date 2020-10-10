import React from 'react'
import Messages from './Messages'
import MessageForm from './MessageForm'

export default function CurrentConversation(props) {
    console.log(props.conversationId)
    if(props.conversationId === "!exists") {
        return <div>No conversations</div>
    } else if(props.conversationId) {
    return (
        <div>
            <Messages conversationId={props.conversationId} />
            <MessageForm conversationId={props.conversationId} /> 
        </div>
    )
    } else {
        return <div>Loading...</div>
    }
}
