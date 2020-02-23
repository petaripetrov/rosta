import React, { useState } from 'react'
import { Surveys } from './Surveys/surveySelection'
import { AdminPanel } from './Admin Panel/adminPanel'
import { useSelector, useDispatch } from 'react-redux'
import useAPI from '../Services/API'


enum Roles {
    Admin = 'Admin',
    SchoolAdmin = 'SchoolAdmin',
    User = 'User'
}

export const Dashboard = () => {
    const role = useSelector((state: any) => state.user.role)
    const [schoolId, setSchoolId] = useState<string | undefined>(undefined)
    const schools = useAPI('schools')
    const dispatch = useDispatch()

    if (role === Roles.Admin || role === Roles.SchoolAdmin) {
        dispatch({ type: 'SET_PENDING_FALSE' })

        const schoolGroup = schools !== undefined ? schools?.map((school: any, index: number) =>
            <li className="menu-item" onClick={() => {
                setSchoolId(school.id)
            }} key={index}><a>{school.name}</a></li>) : <div>No avalible schools</div>
        return (
            <div>
                <div className="dropdown">
                    <a href="#" className="btn btn-link dropdown-toggle" tabIndex={0}>
                        {'Schools'}
                    </a>
                    <ul className="menu">
                        {schoolGroup}
                    </ul>
                </div>
                <AdminPanel schoolId={schoolId} />
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
