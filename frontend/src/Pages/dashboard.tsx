import React from 'react'
import { Surveys } from './Surveys/surveySelection'
import { AdminPanel } from './Admin Panel/adminPanel'
import { useSelector, useDispatch } from 'react-redux'


enum Roles {
    Admin = 'Admin',
    SchoolAdmin = 'SchoolAdmin'
}

export const Dashboard = () => {
    const role = useSelector((state: any) => state.user.role)
    const dispatch = useDispatch()

    console.log(role)
    if (!role) {
        dispatch({ type: 'SET_PENDING_TRUE' })
        return (<div></div>)
    }
    if (role === Roles.Admin || role === Roles.SchoolAdmin) {
        dispatch({ type: 'SET_PENDING_FALSE' })
        return (
            <AdminPanel />
        )
    } else {
        return (
            <Surveys />
        )
    }
}
