import React from 'react'
import { Redirect } from 'react-router-dom'
import useAPI from '../../Services/API'

export const SelectedSurvey = (props: any) => {

    const test = useAPI('login')

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