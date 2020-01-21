import React, { FunctionComponent, useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

interface createSurveyForm {
    surveyName: string,
    description: string
}

const CreateSurvey: FunctionComponent<{ initial?: createSurveyForm }> = ({ initial = { surveyName: '' } }) => {

    const {t} = useTranslation()

    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group className="surveyNameGroup">
                        <Form.Label>{t('name')}</Form.Label>
                        <Form.Control type="input" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="descriptionGroup">
                        <Form.Label>{t('description')}</Form.Label>
                        <Form.Control type="input" className="descriptionControl" />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

export default CreateSurvey