import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container } from 'react-bootstrap'

export class Header extends React.Component {

    render() {
        return (
            <div className="header" >
                <Button className="burger">
                    <FontAwesomeIcon icon="bars" />
                </Button>
                <Container className="schoolName">
                    {'School name goes here through API call'}
                </Container>
            </div>
        )
    }
}