import React from 'react'
import {FaTimes, FaCheck} from 'react-icons/fa'

export default function ApproveDecline(props) {
    return (
        <span className="approveDecline">
            <button onClick={props.onApprove} className="approve" ><FaCheck /></button>
            <button onClick={props.onDecline} className="decline" ><FaTimes /></button>
        </span>
    )
}
