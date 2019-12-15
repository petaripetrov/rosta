import React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container } from 'react-bootstrap'
import anime from 'animejs'
import { BurgerNav } from "./burger"

export function Header() {
    const myRef = React.createRef()
    const dispatch = useDispatch()

    return (
        <div className="header" >
            <Button ref={myRef} className="burger"
                onClick={() => {
                    dispatch({ type: 'BURGER_TURN' })
                    anime({
                        targets: myRef.current,
                        backgroundPositionX: '0px',
                        scale: {
                            value: [1, 0.8],
                            duration: 1000
                        },
                        scale: {
                            value: [0.8, 1],
                            duration: 1000
                        }
                    })
                }
                }>
                <FontAwesomeIcon icon="bars" />
            </Button>
            <BurgerNav />
            <Container className="schoolName">
                {'School name goes here through API call'}
            </Container>
        </div >
    )
}
