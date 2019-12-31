import React from 'react'
import { Redirect } from 'react-router-dom'

export const SubmitCandidacy = (props) => {

    return (
        props.isLoggedIn === true
            ? <div>Submit Candidacy</div>
            : <Redirect to="/login" />
    )
}

export const SubmitSurvey = (props) => {

    return (
        props.isLoggedIn === true
            ? <div>Submit Survey</div>
            : <Redirect to="/login" />
    )
}