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
    const { path, url } = useRouteMatch()
    const location = useLocation()
    const surveys = useAPI('surveys')
    const [selectedSurvey, setSelectedSurvey] = useState(initial)
    const { t } = useTranslation()
    let surveyButtons: Array<Survey>

    if (surveys !== undefined) {
        surveyButtons = surveys.map((survey: Survey, index: number) =>
            <Button key={index} className="surveyButton" onClick={() => {
                setSelectedSurvey(survey)
                history.push(`${url}/answerSurvey`)
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
                ? <React.Fragment>
                    {/* <Button className="createSurveyButton" onClick={() => { history.push(`${url}/createSurvey`) }}>{t('createSurvey')}</Button> */}
                    <Tab.Container>
                        <Row>
                            <Col className="surveyCol">
                                <ListGroup className="surveyList">
                                    {surveyButtons}
                                    {surveyButtons}
                                    {surveyButtons}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Tab.Container>
                </React.Fragment>
                : null
        )
    }

    return (
        <React.Fragment>
            <Route path={`${path}/answerSurvey`}>
                <SelectedSurvey selectedSurvey={selectedSurvey} />
            </Route>
            <Route path={`${path}/createSurvey`}>
                <CreateSurvey />
            </Route>
            <SurveyWrapper />
        </React.Fragment>
    )
}