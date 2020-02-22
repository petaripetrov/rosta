import React from 'react'
import useAPI from '../../Services/API'
import { useTranslation } from 'react-i18next'

export const AdminPanel = () => {
    const users = useAPI('users', '1')
    const { t } = useTranslation()

    console.log(users)

    const userGroup = users?.map((user: any, index: number) => 
    <tr key={index}>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>yeet</td>
    </tr>)

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>{(t('Email'))}</th>
                    <th>{(t('School'))}</th>
                    <th>{(t('Role'))}</th>
                </tr>
            </thead>
            <tbody>
                {userGroup}
            </tbody>
        </table>
    )
}