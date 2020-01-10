import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

export const SelectedSurvey = (props) => {
    console.log(props.selectedSurvey)

    if (props.selectedSurvey === null) {

        return (
            <Redirect to="/surveys" />
        )
    } else {

        return (
            <div>
            </div>
        )
    }
}