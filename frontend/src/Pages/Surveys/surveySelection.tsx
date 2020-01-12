import React, { useState, FunctionComponent } from 'react'
import { useHistory, Route, useRouteMatch, useLocation } from 'react-router-dom'
import { Button, Row } from 'react-bootstrap'

import { SelectedSurvey } from './selectedSurvey'
import './surveys.css'
import useAPI from '../../Services/API'
import { Survey } from '../../types'

export const Surveys: FunctionComponent<{ initial?: Survey }> = ({ initial }) => {
    const history = useHistory()
    const { path, url } = useRouteMatch()
    const location = useLocation()
    const surveys = useAPI('surveys')
    const [selectedSurvey, setSelectedSurvey] = useState(initial)
    let surveyButtons: Array<Survey>

    if (surveys !== undefined) {
        surveyButtons = surveys.map((survey: Survey, index: number) =>
            <Button key={index} className="surveyButton" onClick={() => {
                setSelectedSurvey(survey)
                history.push(`${url}/${survey.id}`)
            }}>
                <span className="surveyButtonText">
                    {survey.name}
                </span>
            </Button>
        )
    }

    const SurveyWrapper = () => {

        return (
            location.pathname === '/surveys'
                ? <ul className="surveyList">
                    {surveyButtons}
                </ul>
                : null
        )
    }

    return (
        <React.Fragment>
            <Route path={`${path}/:surveyId`}>
                <SelectedSurvey selectedSurvey={selectedSurvey} />
            </Route>
            <Row>
            </Row>
            <SurveyWrapper />
        </React.Fragment>
    )
}