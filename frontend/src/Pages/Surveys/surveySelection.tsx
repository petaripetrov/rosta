import React, { useState, FunctionComponent } from 'react'
import { useHistory, Route, useRouteMatch, useLocation } from 'react-router-dom'

import SelectedSurvey from './selectedSurvey'
import CreateSurvey from './createSurvey'
import './surveys.css'
import useAPI from '../../Services/API'
import { Survey } from '../../types'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


/**
 * Renders list of surveys
 * @param {Object} initial - initial empty object to map useState() to 
 * @param {number} id
 * @param {string} name
 * @param {Vote[]} votes
 * @param {Option[]} option
 * @param {Date} endDate,
 * @param {string} description,
 * @param {string} photo
 * @param {string} color
 */
export const Surveys: FunctionComponent<{ initial?: Survey }> = ({ initial }) => {
    const history = useHistory()
    const { path } = useRouteMatch()
    const location = useLocation()
    const surveys = useAPI('surveys')
    const [selectedSurvey, setSelectedSurvey] = useState(initial)
    const { t } = useTranslation()

    /**
     * Map an object of type Surveys to elements
     */
    const surveyButtons = surveys !== undefined
        ? surveys.map((survey: Survey, index: number) =>
            <button key={index} className="btn surveyButton" onClick={() => {
                setSelectedSurvey(survey)
            }}>
                <span className="surveyButtonText">
                    {survey.name}
                </span>
            </button>
        )
        : <div className="fetchingSurveySvg">
            <h1>{'Fetching Surveys'}</h1>
            <FontAwesomeIcon icon="poll-h" size="10x" />
        </div>


    const SurveyWrapper = () => {

        return (
            location.pathname === '/surveys'
                ? <React.Fragment>
                    <SelectedSurvey selectedSurvey={selectedSurvey} />
                    <button className="createSurveyButton" onClick={() => { history.push(`${path}/createSurvey`) }}>{t('createSurvey')}</button>
                        <div className="surveyCol">
                            <ul className="surveyList">
                                {surveyButtons}
                            </ul>
                        </div>
                </React.Fragment>
                : null
        )
    }

    return (
        <React.Fragment>
            <Route path={`${path}/createSurvey`}>
                <CreateSurvey />
            </Route>
            <SurveyWrapper />
        </React.Fragment>
    )
}