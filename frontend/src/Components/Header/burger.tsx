import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import './header.css'

interface BurgerNavProps{
    burgerState: Boolean
}

export const BurgerNav = (props: BurgerNavProps) => {
    const { t } = useTranslation()
    const history = useHistory()
    const dispatch = useDispatch()

    const animation = useSpring({
        marginLeft: props.burgerState ? 0 : -315
    })

    function handleSurveyButton() {
        history.push('/surveys')
    }

    function handleCandidacyButton() {
        history.push('/candidacies')
    }

    function handleExitButton() {
        dispatch({ type: 'LOGOUT_USER' })
    }

    return (
        <animated.div style={animation} className="burgerNav">
            <div className="transparentBar"></div>
            <Button className="burgerLink" onClick={handleSurveyButton}>
                <div>{t('surveys')}</div>
            </Button>
            <Button className="burgerLink" onClick={handleCandidacyButton}>
                <div>{t('candidacies')}</div>
            </Button>
            <Button className="burgerLink" onClick={handleExitButton}>
                <div>{t('exit Account')}</div>
            </Button>
        </animated.div>
    )
}
