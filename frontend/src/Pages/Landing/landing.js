import React from 'react'
import { Container } from 'react-bootstrap'
import { useHistory, Redirect } from 'react-router-dom'

import SvgName from './rosta.svg'
import SvgDrawing from './undraw_voting_nvu7 1.svg'
import { RostaButton } from '../../Components/Library'
import './landing.css'
import { useTranslation } from 'react-i18next'

export const Landing = (props) => {
    let history = useHistory()
    const { t } = useTranslation()

    return (
        <Container>
            <img src={SvgName} className="svgName" alt={'Rösta'}></img>
            <img src={SvgDrawing} className="svgDrawing" alt="SVG Drawing"></img>
            <RostaButton text={t('Login')} type="soft" className="loginButton" click={() => {
                history.push('/login')
            }}>
            </RostaButton>
            <RostaButton text={t('Register')} type="soft" className="registerButton" click={() => {
                history.push('/register')
            }} />
        </Container>
    )
}