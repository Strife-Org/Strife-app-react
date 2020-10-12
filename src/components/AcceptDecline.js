import React from 'react'
import styles from "./styles/AcceptDecline.module.css"
import classnames from "classnames"

export default function AcceptDecline(props) {
    return (
        <span>
            <button className={classnames(styles.button, styles.green)} onClick={props.onAccept} >&#10003;</button>
            <button className={classnames(styles.button, styles.red)} onClick={props.onDecline}>&times;</button>
        </span>
    )
}
