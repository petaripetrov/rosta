import React, { FunctionComponent } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import SvgName from './rosta.svg'
import SvgDrawing from './undraw_voting_nvu7 1.svg'
import './landing.css'
import { useTranslation } from 'react-i18next'

export const Landing: FunctionComponent = () => {
    let history = useHistory()
    const { t } = useTranslation()

    function handleLoginButton() {
        history.push('/login')
    }

    function handleRegisterButton() {
        history.push('/register')
    }

    return (
        <Container>
            <img src={SvgName} className="svgName" alt={'Rösta'}></img>
            <img src={SvgDrawing} className="svgDrawing" alt="SVG Drawing"></img>
            <Button className="loginButton" onClick={handleLoginButton} >{t('Login')}</Button>
            <Button className="registerButton" onClick={handleRegisterButton} >{t('Register')}</Button>
        </Container>
    )
}