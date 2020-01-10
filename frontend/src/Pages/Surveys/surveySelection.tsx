import React, { useState, FunctionComponent } from 'react'
import { useHistory, Route, useRouteMatch, useLocation } from 'react-router-dom'
import { Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { SelectedSurvey } from './selectedSurvey'
import fetchSurveys from '../../Services/Store/Actions/Survey'
import './surveys.css'
import { useTranslation } from 'react-i18next'
import { Survey } from '../../types'

export const Surveys: FunctionComponent<{ initial?: Survey }> = ({ initial }) => {
    const history = useHistory()
    const { path, url } = useRouteMatch()
    const location = useLocation()
    const survey = useSelector((state: any) => state.survey)
    const { t } = useTranslation()
    const [selectedSurvey, setSelectedSurvey] = useState(initial)


    const surveyButtons = survey.surveys.map((survey: Survey, index: number) =>
        <Button key={index} className="surveyButton" onClick={() => {
            setSelectedSurvey(survey)
            history.push(`${url}/${survey.id}`)
        }}>
            <span className="surveyButtonText">
                {survey.name}
            </span>
        </Button>
    )

    const SurveyWrapper = () => {

        return (
            location.pathname === '/surveys'
                ? <ul className="surveyList">
                    {surveyButtons}
                </ul>
                : null
        )
    }

    if (survey.pending === true) {

        return (
            <div>Loading...</div>
        )
    } else if (survey.pending === false && survey.surveys.length === 0) {
    }

    return (
        <React.Fragment>
            <Route path={`${path}/:surveyId`}>
                <SelectedSurvey selectedSurvey={selectedSurvey} />
            </Route>
            <Row>
                <Button className="createSurveyButton">
                    {t('createSurvey')}
                </Button>
            </Row>
            <SurveyWrapper />
        </React.Fragment>
    )
}