import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container } from 'react-bootstrap'
import { BurgerNav } from "./burger"

export class Header extends React.Component {
    state = { alteredPosition: true }

    render() {
        return (
            <div className="header" >
                <Button className="burger"
                    onClick={() =>
                        this.setState({ alteredPosition: !this.state.alteredPosition })
                    }>
                    <FontAwesomeIcon icon="bars" />
                </Button>
                <BurgerNav/>
                <Container className="schoolName">
                    {'School name goes here through API call'}
                </Container>
            </div >
        )
    }
}
