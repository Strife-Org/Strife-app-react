import React from 'react'
import Github from './icons/Github'
import Google from './icons/Google'
import Signout from './icons/Signout'

console.log(Signout)
console.log(Github)

export default function Icon(props) {
    switch(props.icon) {
        case "github":
            return (<Github/>)
        case "google":
            return (<Google />)
        case "signout":
            return (<Signout />)
        default:
            return (<div />)
    }
}
