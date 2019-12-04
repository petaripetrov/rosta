import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container } from 'react-bootstrap'

export const Header = props => {

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
