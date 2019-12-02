import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'

export const Header = () => {
    return (
        <div className="header">
            <Button className="burger">
                <FontAwesomeIcon icon="bars"/>
            </Button>
        </div>
    )
}