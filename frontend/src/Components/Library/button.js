import React from 'react'
import { Button } from 'react-bootstrap'
import './library.css'

export const RostaButton = (props) => {

    if (props.type === "solid") {
        return (
            <Button onClick={props.click} className={`solidButton ${props.className}`}>
                {props.text}
            </Button>
        )
    } else if (props.type === "soft") {
        return (
            <Button onClick={props.click} className={`softButton ${props.className}`}>
                <div className="softButtonText">
                    {props.text}
                </div>
            </Button>
        )
    } else {
        return (
            <div>
                {"Error missing button type"}
            </div>
        )
    }
}