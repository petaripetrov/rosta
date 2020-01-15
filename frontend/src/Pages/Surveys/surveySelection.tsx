import React, { useState, FunctionComponent } from 'react'
import { useHistory, Route, useRouteMatch, useLocation } from 'react-router-dom'
import { Button, Tab, Row, ListGroup, Col } from 'react-bootstrap'

import SelectedSurvey from './selectedSurvey'
import CreateSurvey from './createSurvey'
import './surveys.css'
import useAPI from '../../Services/API'
import { Survey } from '../../types'
import { useTranslation } from 'react-i18next'

export const Surveys: FunctionComponent<{ initial?: Survey }> = ({ initial = { name: 'Error' } }) => {
    const history = useHistory()
    const { path } = useRouteMatch()
    const location = useLocation()
    const surveys = useAPI('surveys')
    const [selectedSurvey, setSelectedSurvey] = useState(initial)
    const { t } = useTranslation()


    const surveyButtons = surveys !== undefined
        ? surveys.map((survey: Survey, index: number) =>
            <Button key={index} className="surveyButton" onClick={() => {
                setSelectedSurvey(survey)
            }}>
                <span className="surveyButtonText">
                    {survey.name}
                </span>
            </Button>
        )
        : <div>error</div>


    const SurveyWrapper = () => {

        return (
            location.pathname === '/surveys'
                ? <React.Fragment>
                    <SelectedSurvey selectedSurvey={selectedSurvey} />
                    <Button className="createSurveyButton" onClick={() => { history.push(`${path}/createSurvey`) }}>{t('createSurvey')}</Button>
                    <Row>
                        <Col className="surveyCol">
                            <ListGroup className="surveyList">
                                {surveyButtons}
                            </ListGroup>
                        </Col>
                    </Row>
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