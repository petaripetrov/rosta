import React from 'react'
import { useHistory, Route, useRouteMatch, useLocation } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { SelectedSurvey } from './selectedSurvey'
import fetchSurveys from '../../Services/Store/Actions/Survey'
import './surveys.css'

export const Surveys = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { path, url } = useRouteMatch()
    const location = useLocation()
    const survey = useSelector(state => state.survey)


    const surveyButtons = survey.surveys.map((survey, index) =>
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

    if (survey.pending === true) {

        return (
            <div>Loading...</div>
        )
    } else if(survey.pending === false && survey.surveys.length === 0){
        dispatch(fetchSurveys())
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