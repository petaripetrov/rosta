import React from 'react'
import { useHistory, Route, useRouteMatch, useLocation } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { SelectedSurvey } from './selectedSurvey'
import './surveys.css'

export const Surveys = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { path, url } = useRouteMatch()
    const location = useLocation()

    let surveys = [
        {
            id: 1,
            name: "Колко красива е Колева",
            votes: [],
            options: [],
            endDate: "2019-06-05T00:00:00",
            description: "Ми виж името",
            photo: null,
            color: "#000000"
        },
        {
            id: 2,
            name: "test",
            votes: [],
            options: [],
            endDate: "2019-05-06T00:00:00",
            description: "test",
            photo: null,
            color: "#ffffff"
        },
        {
            id: 3,
            name: "Gosho's amazing survey",
            votes: [],
            options: [],
            endDate: "2019-12-30T00:00:00",
            description: "Gosho's amazing and wonderful survey",
            photo: "null",
            color: "#ffffff"
        },
        {
            id: 4,
            name: "Koleva",
            votes: [],
            options: [],
            endDate: "2019-12-30T00:00:00",
            description: "Koleva's amazing survey",
            photo: "null",
            color: "#test"
        },
        {
            id: 5,
            name: "Koleva",
            votes: [],
            options: [],
            endDate: "2019-12-30T00:00:00",
            description: "Koleva's amazing survey",
            photo: "null",
            color: "#test"
        },
        {
            id: 6,
            name: "Koleva",
            votes: [],
            options: [],
            endDate: "2019-12-30T00:00:00",
            description: "Koleva's amazing survey",
            photo: "null",
            color: "#test"
        }
    ]

    console.log(location)

    const surveyButtons = surveys.map((survey, index) =>
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

    return (
        <React.Fragment>
            <Route path={`${path}/:surveyId`}>
                <SelectedSurvey />
            </Route>
            <SurveyWrapper />
        </React.Fragment>
    )
}