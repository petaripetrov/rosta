import React from 'react'
import { Surveys } from '../Surveys/surveySelection'
import { useSelector, useDispatch } from 'react-redux'


enum Roles {
    Admin = 'Admin',
    SchoolAdmin = 'SchoolAdmin'
}

export const Dashboard = () => {
    const role = useSelector((state: any) => state.login.role)
    const dispatch = useDispatch()

    if (!role) {
        dispatch({type: 'SET_PENDING_TRUE'})
        return (<div></div>)
    }
    if (role === Roles.Admin || role === Roles.SchoolAdmin) {
        dispatch({type: 'SET_PENDING_FALSE'})
        return (
            <div>
                OOOOP
        </div>
        )
    } else {
        return (
            <Surveys />
        )
    }
}
