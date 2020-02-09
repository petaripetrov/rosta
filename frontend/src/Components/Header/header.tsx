import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Navbar, ButtonGroup } from 'react-bootstrap'
import { useSpring, animated } from 'react-spring'
import { BurgerNav } from "./burger"
import './header.css'

export const Header = () => {
    const dispatch = useDispatch()
    const currentLanguage = useSelector((state: any) => state.translation.language)
    const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn)
    const [burgerOn, toggleBurger] = useState(false)
    const animation = useSpring({
        opacity: burgerOn ? 0 : 1,
        config: {
            duration: 200
        }
    })

    let disableEnButton, disableBgButton

    if (currentLanguage === 'en') {
        disableBgButton = false
        disableEnButton = true
    } else if (currentLanguage === 'bg') {
        disableEnButton = false
        disableBgButton = true
    }

    function handleBurgerButton() {
        toggleBurger(!burgerOn)
    }

    function handleBurgerButtonBlur() {
        toggleBurger(false)
    }

    return (
        <React.Fragment>
            <header className="navbar bg-primary">
                <section className="navbar-section">
                    <animated.div style={animation}>
                        <button className="burger"
                            onClick={handleBurgerButton} onBlur={handleBurgerButtonBlur} disabled={!isLoggedIn}>
                            <FontAwesomeIcon icon="bars" />
                        </button>
                    </animated.div>
                </section>
                <BurgerNav burgerState={burgerOn} />
                <section className="navbar-center schoolName">
                    {'School Name'}
                </section>
                <section className="navbar-section">
                    <div aria-label="Language menu" className="btn-group">
                        <button className="languageButton btn text-light" disabled={disableEnButton}
                            onClick={() => {
                                dispatch({ type: 'LANGUAGE_CHANGE_EN' })
                            }}
                        >{'EN'}</button>
                        <button className="languageButton btn text-light" disabled={disableBgButton}
                            onClick={() => {
                                dispatch({ type: 'LANGUAGE_CHANGE_BG' })
                            }}
                        > {'BG'}</button>
                    </div>
                </section>
            </header >
        </React.Fragment>
    )
}
