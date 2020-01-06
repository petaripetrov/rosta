import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Navbar, ButtonGroup } from 'react-bootstrap'
import anime from 'animejs'
import { BurgerNav } from "./burger"
import './header.css'

export const Header = () => {
    const burgerButtonRef = useRef(null)
    const dispatch = useDispatch()
    const currentLanguage = useSelector(state => state.translation.language)
    const isLoggedIn = useSelector(state => state.login.isLoggedIn)

    let disableEnButton, disableBgButton

    if (currentLanguage === 'en') {
        disableBgButton = false
        disableEnButton = true
    } else if (currentLanguage === 'bg') {
        disableEnButton = false
        disableBgButton = true
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" className="header" fixed="top">
                <Button ref={burgerButtonRef} className="burger"
                    onClick={() => {
                        dispatch({ type: 'BURGER_TURN' })
                        anime({
                            targets: burgerButtonRef.current,
                            scale: {
                                value: [1, 0.8],
                                duration: 1000,
                            },
                            scale: {
                                value: [0.8, 1],
                                duration: 1000
                            }
                        })
                    }} disabled={!isLoggedIn}>
                    <FontAwesomeIcon icon="bars" />
                </Button>
                <BurgerNav />
                <div className="schoolName">
                    {'School Name'}
                </div>
                <ButtonGroup aria-label="Language menu" className="buttonGroup">
                    <Button className="languageButton" disabled={disableEnButton}
                        onClick={() => {
                            dispatch({ type: 'LANGUAGE_CHANGE_EN' })
                        }}
                    >{'EN'}</Button>
                    <Button className="languageButton" disabled={disableBgButton}
                        onClick={() => {
                            dispatch({ type: 'LANGUAGE_CHANGE_BG' })
                        }}
                    > {'BG'}</Button>
                </ButtonGroup>
            </Navbar>
        </div>
    )
}
