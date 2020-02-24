import React, { useState } from 'react'
import { Surveys } from './Surveys/surveySelection'
import { AdminPanel } from './Admin Panel/adminPanel'
import { useSelector, useDispatch } from 'react-redux'
import useAPI from '../Services/API'
import { useTranslation } from 'react-i18next'


enum Roles {
    Admin = 'Admin',
    SchoolAdmin = 'SchoolAdmin',
    User = 'User'
}



export const Dashboard = () => {
    const role = useSelector((state: any) => state.user.role)
    const { t } = useTranslation()
    const schools = useAPI('schools')
    const dispatch = useDispatch()

    if (role === Roles.Admin || role === Roles.SchoolAdmin) {
        dispatch({ type: 'SET_PENDING_FALSE' })

        
        return (
            <div>
                <AdminPanel schools={schools} />
            </div>
        )
    } else if (role === Roles.User) {


        return (
            <Surveys />
        )
    } else {
        dispatch({ type: 'SET_PENDING_TRUE' })
        return (<div></div>)
    }
}
