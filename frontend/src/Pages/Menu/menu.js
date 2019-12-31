import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Container, ButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './menu.css'

export const Menu = (props) => {
    const options = useSelector(state => state.login.options)
    const dispatch = useDispatch()
    const history = useHistory()
    const { t } = useTranslation()

    const menuOptions = options ? options.map((option) =>
        <Button key={option} onClick={() => {
            if (option === 'Exit Account') {
                dispatch({ type: 'LOGOUT_USER' })
                history.push('/')
            } else {
                history.push(`/${option}`.toLowerCase().replace(/\s/g, ''))
            }
        }} className="menuButton">
            <div className="burgerLinkText">{t(option)}</div>
        </Button>
    ) : <div>{t('error')}</div>

    return (
        props.isLoggedIn === true
            ? <Container>
                <ButtonGroup id="menu">
                    {menuOptions}
                </ButtonGroup>
            </Container>
            : <Redirect to="/login" />
    )
}