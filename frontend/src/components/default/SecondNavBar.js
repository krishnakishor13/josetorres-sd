import React from 'react'

export default function SecondNavBar(props) {
    return (
        <>
            <div className="second-nav-bar-title">{props.title}</div>
            <div>{props.right}</div>
        </>
    )
}
