import React, { useState, FunctionComponent, useEffect, useMemo } from 'react'
import { useHistory, Route, useRouteMatch, useLocation } from 'react-router-dom'
import { Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { SelectedSurvey } from './selectedSurvey'
import './surveys.css'
import useAPI from '../../Services/API'
import { Survey } from '../../types'

export const Surveys: FunctionComponent<{ initial?: Survey }> = ({ initial }) => {
    const history = useHistory()
    const { path, url } = useRouteMatch()
    const location = useLocation()
    const isPending = useAPI('placeholder')
    const [selectedSurvey, setSelectedSurvey] = useState(initial)
    let surveyButtons: Array<Survey>

    useMemo(() => {
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
    }, [surveys])

    const SurveyWrapper = () => {

        return (
            location.pathname === '/surveys'
                ? <ul className="surveyList">
                    {surveyButtons}
                </ul>
                : null
        )
    }

    if (isPending === true) {

        return (
            <div>Loading...</div>
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