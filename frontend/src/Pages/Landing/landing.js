import React from 'react'
import anime from 'animejs'
import { Container } from 'react-bootstrap'

import SvgName from './rosta.svg'
import SvgDrawing from './undraw_voting_nvu7 1.svg'

export const Landing = () => {
    const ref = React.createRef()
    const test = 5

    return (
        <Container fluid="true" >
            <img src={SvgName} className="svgName"></img>
            <img src={SvgDrawing} className="svgDrawing"></img>
        </Container>
    )
}