import React from 'react'
import styles from './styles/Message.module.css'
import classNames from 'classnames'

function Message(props) {
    return (
        <div className={classNames(styles.message, props.isOwner ? styles.own : styles.other)}>
            {props.text}
        </div>
    )
}

export default Message
