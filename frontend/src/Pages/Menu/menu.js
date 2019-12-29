import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export const Menu = (props) => {
    const options = useSelector(state => state.login.options)
    const dispatch = useDispatch()
    const history = useHistory()
    const { t } = useTranslation()

    const menuOptions = options ? options.map((option) =>
        <Button key={option} onClick={() => {
            console.log(option)
            if (option === 'Exit Account') {
                dispatch({ type: 'LOGOUT_USER' })
                history.push('/')
            } else {
                history.push(`/${option}`.toLowerCase().replace(/\s/g, ''))
            }
        }} className="burgerLink">
            <div className="burgerLinkText">{t(option)}</div>
        </Button>) : <div>error</div>

    return (
        props.isLoggedIn === true
            ? <div>
                {menuOptions}
            </div>
            : <Redirect to="/login" />
    )
}