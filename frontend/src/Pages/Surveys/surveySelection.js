import React from 'react'
import { useHistory, Route, useRouteMatch, useLocation } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { SelectedSurvey } from './selectedSurvey'
import './surveys.css'

export const Surveys = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { path, url } = useRouteMatch()
    const location = useLocation()
    const surveys = useSelector(state => state.survey)


    const surveyButtons = surveys.surveys.map((survey, index) =>
        <Button key={index} className="surveyButton" onClick={() => {
            dispatch({
                type: 'SELECT_SURVEY',
                payload: survey
            })
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
                ? <Container fluid className="surveyOptionsContainer">
                    <ul className="surveyList">
                        {surveyButtons}
                    </ul>
                </Container>
                : null
        )
    }

    if (surveys.pending === true || surveys.error != null) {

        return (
            <div>Loading...</div>
        )
    }

    return (
        <React.Fragment>
            <Route path={`${path}/:surveyId`}>
                <SelectedSurvey />
            </Route>
            <SurveyWrapper />
        </React.Fragment>
    )
}