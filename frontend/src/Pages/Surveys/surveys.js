import React from 'react'
import { Redirect, useHistory, Route, Link, useRouteMatch } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'

import './surveys.css'

export const Surveys = (props) => {
    const history = useHistory()
    const { path, url } = useRouteMatch()

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

    console.log({
        path,
        url
    })
    function handleSurveyButtonClick() {
        history.push(`${url}/test`)
    }

    const surveyButtonT = surveys.map((survey, index) =>
        <Button key={index} className="surveyButton" onClick={handleSurveyButtonClick}>
            <span className="surveyButtonText">
                {survey.name}
            </span>
        </Button>
    )

    return (
        <React.Fragment>
            <Container fluid className="surveyOptionsContainer">
                <ul className="surveyList">
                    {surveyButtonT}
                </ul>
            </Container>
        </React.Fragment>
    )
}

const SurveysRendered = (props) => {

    return(
        <div>Survey Test</div>
    )
}