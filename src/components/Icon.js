import React from 'react'
import Github from './icons/Github'
import Google from './icons/Google'
import Signout from './icons/Signout'
import AddContact from './icons/AddContact'
import Question from './icons/Question'
import File from './icons/File'

export default function Icon(props) {
    switch(props.icon) {
        case "github":
            return (<Github className={props.className} onClick={props.onClick} />)
        case "google":
            return (<Google className={props.className} onClick={props.onClick} />)
        case "signout":
            return (<Signout className={props.className} onClick={props.onClick} />)
        case "addcontact":
            return (<AddContact className={props.className} onClick={props.onClick} />)
        case "question":
            return (<Question className={props.className} onClick={props.onClick} />)
        case "file":
            return (<File className={props.className} onClick={props.onClick} />)
        default:
            return (<div className={props.className} />)
    }
}
