import React from 'react'
import Github from './icons/Github'
import Google from './icons/Google'
import Signout from './icons/Signout'
import AddContact from './icons/AddContact'

export default function Icon(props) {
    switch(props.icon) {
        case "github":
            return (<Github onClick={props.onClick} />)
        case "google":
            return (<Google onClick={props.onClick} />)
        case "signout":
            return (<Signout onClick={props.onClick} />)
        case "addcontact":
            return (<AddContact onClick={props.onClick} />)
        default:
            return (<div />)
    }
}
