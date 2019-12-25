import React from 'react'
import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import SvgName from './rosta.svg'
import SvgDrawing from './undraw_voting_nvu7 1.svg'
import { RostaButton } from '../../Components/Library'
import './landing.css'

export function Landing() {
    let history = useHistory()

    return (
        <Container>
            <img src={SvgName} className="svgName" alt={'Rösta'}></img>
            <img src={SvgDrawing} className="svgDrawing" alt="SVG Drawing"></img>
            <RostaButton text="Login" type="soft" className="loginButton" click={() => {
                history.push('/login')
            }}>
            </RostaButton>
            <RostaButton text="Register" type="soft" className="registerButton" click={() => {
                history.push('/register')
            }} />
        </Container>
    )
}