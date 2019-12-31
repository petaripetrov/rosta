import React from 'react'
import { Redirect } from 'react-router-dom'

export const Candidacies = (props) => {

    return (
        props.isLoggedIn === true
            ? <div>Candidacies</div>
            : <Redirect to="/login" />
    )
}
