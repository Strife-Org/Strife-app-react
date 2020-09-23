import React from 'react'
import Github from './icons/Github'

export default function Icon(props) {
    switch(props.icon) {
        case "github":
            return (<Github/>)
        default:
            return (<div />)
    }
}
