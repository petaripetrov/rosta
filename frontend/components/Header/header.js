import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Navbar, ButtonGroup } from 'react-bootstrap'
import { useSpring, animated } from 'react-spring'
import { BurgerNav } from "./burger"

const Header = () => {
    const dispatch = useDispatch()
    const currentLanguage = useSelector(state => state.translation.language)
    const isLoggedIn = useSelector(state => state.login.isLoggedIn)
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
        <div>
            <Navbar bg="dark" variant="dark" className="header" fixed="top">
                <animated.div style={animation}>
                    <Button className="burger"
                        onClick={handleBurgerButton} onBlur={handleBurgerButtonBlur} disabled={!isLoggedIn}>
                        <FontAwesomeIcon icon="bars" />
                    </Button>
                </animated.div>
                <BurgerNav burgerState={burgerOn} />
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

export default Header