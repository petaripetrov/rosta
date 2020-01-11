import React from 'react'
import { Redirect } from 'react-router-dom'

export const SelectedSurvey = (props: any) => {

    if (props.selectedSurvey === null) {

        return (
            <Redirect to="/surveys" />
        )
    } else {

        return (
            <div>
                test
            </div>
        )
    }
}