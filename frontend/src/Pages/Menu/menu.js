import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Container, ButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import fetchSurveys from '../../Services/Store/Actions/Survey'
import './menu.css'

export const Menu = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { t } = useTranslation()

    function handleSurveyButton() {
        dispatch(fetchSurveys())
        history.push('/surveys')
    }

    function handleCandidacyButton() {
        history.push('/candidacies')
    }

    function handleExitButton() {
        dispatch({ type: 'LOGOUT_USER' })
    }

    return (
        <Container>
            <ButtonGroup id="menu">
                <Button className="surveyMenuButton" onClick={handleSurveyButton}>
                    <div>{t('surveys')}</div>
                </Button>
                <Button className="candidacyButton" onClick={handleCandidacyButton}>
                    <div>{t('candidacies')}</div>
                </Button>
                <Button className="exitButton" onClick={handleExitButton}>
                    <div>{t('exit Account')}</div>
                </Button>
            </ButtonGroup>
        </Container>
    )
}