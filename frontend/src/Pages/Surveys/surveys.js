import React from 'react'
import { Redirect } from 'react-router-dom'

export const Surveys = (props) => {

    return(
        props.isLoggedIn === true 
        ? <div>Surveys</div>
        : <Redirect to="/login"/>
    )
}