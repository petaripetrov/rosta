import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import './menu.css'

/**
 * Renders Menu page
 */
export const Menu: FunctionComponent = () => {
    /**
     * Dispatch actions to store
     */
    const dispatch = useDispatch()
    const history = useHistory()
    const { t } = useTranslation()

    function handleSurveybutton() {
        history.push('/surveys')
    }

    function handleCandidacybutton() {
        history.push('/candidacies')
    }

    function handleExitbutton() {
        dispatch({ type: 'LOGOUT_USER' })
    }

    return (
            <div className="btn-group" id="menu">
                <button className="btn menuButton" onClick={handleSurveybutton}>
                    <div>{t('surveys')}</div>
                </button>
                <button className="btn menuButton" onClick={handleCandidacybutton}>
                    <div>{t('candidacies')}</div>
                </button>
                <button className="btn menuButton" onClick={handleExitbutton}>
                    <div>{t('exit Account')}</div>
                </button>
            </div>
    )
}