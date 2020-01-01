import React, { useState } from 'react'
import { Redirect, useHistory, Route, Link, useRouteMatch, useParams, useLocation } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'

import './surveys.css'

export const Surveys = (props) => {
    const history = useHistory()
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

    const surveyButton = surveys.map((survey, index) =>
        <Button key={index} className="surveyButton" onClick={() => {
            history.push(`${url}/${survey.id}`)
        }}>
            <span className="surveyButtonText">
                {survey.name}
            </span>
        </Button>
    )

    return (
        location.pathname === '/surveys'
            ? <Container fluid className="surveyOptionsContainer">
                <ul className="surveyList">
                    {surveyButton}
                </ul>
            </Container>
            : <SurveysRendered />
    )
}

export const SurveysRendered = () => {
    const { surveyId } = useParams()
    console.log(surveyId)
    return (
        <div>Survey Test {surveyId}</div>
    )
}