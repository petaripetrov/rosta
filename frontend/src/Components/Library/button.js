import React from 'react'
import { Button } from 'react-bootstrap'

export const RostaButton = (props) => {

    if (props.type === "solid button") {
        return (
            <Button onClick={props.click} className="solidButton">
                {props.text}
            </Button>
        )
    } else if (props.type === "soft button") {
        return (
            <Button onClick={props.click} className="softButton">
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