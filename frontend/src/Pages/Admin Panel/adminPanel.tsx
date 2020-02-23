import React, { useState, useEffect, useRef } from 'react'
import useAPI from '../../Services/API'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

interface AdminPanelProps {
    schoolId: string | undefined
}

interface ModalState {
    active?: string
    user?: any
}

export const AdminPanel = (props: AdminPanelProps) => {
    const dispatch = useDispatch()
    const authCode = useSelector((state: any) => state.user.authCode)
    const [modalState, setModalState] = useState<ModalState>({ active: undefined, user: undefined })
    const [users, setUsers] = useState()
    const { t } = useTranslation()
    const modalRef = useRef(null)
    useOutside(modalRef)

    function useOutside(ref: any) {

        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target) && modalState) {
                setModalState({ active: undefined })
            }
        }

        useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        })
    }

    useEffect(handleUpdate, [props.schoolId])

    function handleUpdate() {
        fetch(`https://localhost:44375/getAllUsers/${props.schoolId}`, {
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


    const userGroup = (props.schoolId !== undefined && users !== undefined) ? users?.map((user: any, index: number) =>
        <tr onClick={() => { setModalState({ active: 'active', user: user }) }} key={index}>
            <td>{user.username}</td>
            <td>{user.school}</td>
            <td>{user.role}</td>
        </tr>) : <div>No Users in selected school</div>

    return (
        <div>
            <div className={`modal ${modalState.active} modal-sm`}>
                <a href="#close" className="modal-overlay" aria-label="Close"></a>
                <div ref={modalRef} className="modal-container">
                    <div className="modal-header">
                        <a href="#close" onClick={() => { setModalState({ active: undefined }) }} className="btn btn-clear float-right" aria-label="Close" />
                        <div className="modal-title h5">{t('Action')}</div>
                    </div>
                    <div className="modal-body">
                        <div className="content">
                            {modalState.user?.role}
                            <br />
                            {modalState.user?.school}
                        </div>
                    </div>
                    <div className="modal-footer">
                        ...
                    </div>
                </div>
            </div>
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