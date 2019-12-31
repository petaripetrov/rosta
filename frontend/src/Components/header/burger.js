import React, { useRef } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import anime from 'animejs'
import './header.css'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const BurgerNav = () => {
    const { t } = useTranslation()
    const basicTimeline = anime.timeline()
    const burgerReference = useRef(null)
    const burgerState = useSelector(state => state.burger.burgerState)
    const history = useHistory()
    const dispatch = useDispatch()

    if (burgerState) {
        basicTimeline
            .add({
                targets: burgerReference.current,
                duration: 300,
                translateX: 300,
                easing: 'easeInOutQuad'
            })
    } else {
        basicTimeline
            .add({
                targets: burgerReference.current,
                duration: 200,
                translateX: 0,
                easing: 'easeInOutQuad'
            })
    }

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
        <div ref={burgerReference} className="burgerNav">
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
        </div>
    )
}
