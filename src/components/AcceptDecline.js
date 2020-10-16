import React from 'react'

export default function AcceptDecline(props) {
    return (
        <span>
            <button onClick={props.onAccept} >&#10003;</button>
            <button onClick={props.onDecline}>&times;</button>
        </span>
    )
}
