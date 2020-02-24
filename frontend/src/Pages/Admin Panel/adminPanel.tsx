import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import './adminPanel.css'

interface AdminPanelProps {
    schools: Array<any> | undefined
}

interface ModalState {
    active?: string
    user?: any

}

interface ModalRequest {
    role?: string
    school?: any
}

interface SchoolState {
    schoolId?: string
    schoolName?: string
}

export const AdminPanel = (props: AdminPanelProps) => {
    const dispatch = useDispatch()
    const authCode = useSelector((state: any) => state.user.authCode)
    const [modalState, setModalState] = useState<ModalState>()
    const [users, setUsers] = useState()
    const [schoolState, setSchoolState] = useState<SchoolState>()
    const [modalRequest, setModalRequest] = useState<ModalRequest>()
    const { t } = useTranslation()

    useEffect(handleUpdate, [schoolState?.schoolId])
    useEffect(() => { console.log(modalRequest) }, [modalRequest])

    function handleUpdate() {
        fetch(`https://localhost:44375/getAllUsers/${schoolState?.schoolId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authCode}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                if (res.status === 400) {
                    throw ('Bad Request')
                }
                dispatch({ type: 'SET_PENDING_FALSE' })
                setUsers(res)
            })
            .catch(error => {
                dispatch({
                    type: 'SET_API_ERROR',
                    error: error
                })
                dispatch({ type: 'SET_PENDING_FALSE' })
            })
    }

    function handleModalSubmit() {
        fetch('https://localhost:44375/addToSchool', {
            method: 'POST',
            body: JSON.stringify({ userID: modalState?.user.id, schoolId: modalRequest?.school.id }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authCode}`
            }
        }).then(response => {
            if (!response.ok) {
                throw Error(`Request rejected with status ${response.status}`)
            }
        }).catch(error => console.log(error))

        fetch('https://localhost:44375/addToRole', {
            method: 'POST',
            body: JSON.stringify({ userID: modalState?.user.id, role: modalRequest?.role }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authCode}`
            }
        }).then(response => {
            if (!response.ok) {
                throw Error(`Request rejected with status ${response.status}`)
            }
        }).catch(error => console.log(error))
        handleUpdate()
        setModalRequest(undefined)
        setModalState({ active: undefined })
    }

    const schoolGroup = props.schools !== undefined ? props.schools?.map((school: any, index: number) =>
        <li className="menu-item" onClick={() => {
            setSchoolState({
                schoolId: school.id,
                schoolName: school.name
            })
        }} key={index}><a>{school.name}</a></li>) : <div>No avalible schools</div>

    const schoolModalGroup = props.schools !== undefined ? props.schools?.map((school: any, index: number) =>
        <li className="menu-item" onClick={() => {
            setModalRequest({
                school: school,
                role: modalRequest?.role
            })
        }} key={index} > <a>{school.name}</a></li >) : <div>No avalible schools</div>

    const userGroup = (schoolState?.schoolId !== undefined && users !== undefined) ? users?.map((user: any, index: number) =>
        <tr onClick={() => { setModalState({ active: 'active', user: user }) }} key={index}>
            <td>{user.username}</td>
            <td>{user.school}</td>
            <td>{user.role}</td>
        </tr>) : <div>No Users in selected school</div>

    return (
        <div>
            <div className="dropdown">
                <a href="#" className="btn btn-link dropdown-toggle" tabIndex={0}>
                    {schoolState?.schoolName ? schoolState.schoolName : t('School')}
                </a>
                <ul className="menu">
                    {schoolGroup}
                </ul>
            </div>
            <button className="btn" onClick={handleUpdate}>Update</button>
            <div className={`modal ${modalState?.active}`}>
                <a href="#close" className="modal-overlay" aria-label="Close"></a>
                <div className="modal-container actionModal">
                    <div className="modal-header">
                        <a href="#close" onClick={() => { setModalState({ active: undefined }); handleUpdate() }} className="btn btn-clear float-right" aria-label="Close" />
                        <div className="modal-title h5">{t('Action')}</div>
                    </div>
                    <div className="modal-body modalBody">
                        <div className="content">
                            <div className="dropdown">
                                <a href="#" className="btn btn-link dropdown-toggle" tabIndex={0}>
                                    {modalRequest?.school.name ? modalRequest.school.name : t('School')}
                                </a>
                                <ul className="menu">
                                    {schoolModalGroup}
                                </ul>
                                <br />
                            </div>
                            <div className="dropdown">
                                <a href="#" className="btn btn-link dropdown-toggle" tabIndex={0}>
                                    {modalRequest?.role ? modalRequest?.role : t('Role')}
                                    </a>
                                <ul className="menu">
                                    <li className="menu-item" onClick={() => { setModalRequest({ school: modalRequest?.school, role: 'Admin' }) }}><a>{t('Admin')}</a></li>
                                    <li className="menu-item" onClick={() => { setModalRequest({ school: modalRequest?.school, role: 'SchoolAdmin' }) }}><a>{t('School Admin')}</a></li>
                                    <li className="menu-item" onClick={() => { setModalRequest({ school: modalRequest?.school, role: 'User' }) }}><a>{t('User')}</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={handleModalSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div >

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>{t('Email')}</th>
                        <th>{t('School')}</th>
                        <th>{t('Role')}</th>
                    </tr>
                </thead>
                <tbody>
                    {userGroup}
                </tbody>
            </table>
        </div >
    )
}