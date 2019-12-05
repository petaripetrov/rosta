import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container } from 'react-bootstrap'
import { BurgerNav } from "./burger"

export const Header = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="header" >
            <Button className="burger">
                <FontAwesomeIcon icon="bars" />
            </Button>
            <BurgerNav open={open} setOpen={setOpen}/>
            <Container className="schoolName">
                {'School name goes here through API call'}
            </Container>
        </div>
    )
}