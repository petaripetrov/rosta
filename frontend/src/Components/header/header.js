import React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Navbar } from 'react-bootstrap'
import anime from 'animejs'
import { BurgerNav } from "./burger"
import './header.css'

export function Header() {
    const myRef = React.createRef()
    const dispatch = useDispatch()

    return (
        <div>
            <Navbar bg="dark" variant="dark" className="header" fixed="top">
                <Button ref={myRef} className="burger"
                    onClick={() => {
                        dispatch({ type: 'BURGER_TURN' })
                        anime({
                            targets: myRef.current,
                            scale: {
                                value: [1, 0.8],
                                duration: 1000,
                            },
                            scale: {
                                value: [0.8, 1],
                                duration: 1000
                            }
                        })
                    }}>
                    <FontAwesomeIcon icon="bars" />
                </Button>
                <BurgerNav />
                <div className="schoolName">
                    {'School Name'}
                </div>
            </Navbar>
        </div>
    )
}
