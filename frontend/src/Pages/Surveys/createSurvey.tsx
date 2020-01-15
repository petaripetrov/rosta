import React, { FunctionComponent, useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'

interface createSurveyForm {
    surveyName: string,
    description: string
}

const CreateSurvey: FunctionComponent<{ initial?: createSurveyForm }> = ({ initial = { surveyName: '' } }) => {



    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group className="surveyNameGroup">
                        <Form.Label>{'Survey name'}</Form.Label>
                        <Form.Control type="input" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="descriptionGroup">
                        <Form.Label>{'Description'}</Form.Label>
                        <Form.Control type="input" className="descriptionControl" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="descriptionGroup">
                        <Form.Label>{'Description'}</Form.Label>
                        <Form.Control type="input" className="" />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

export default CreateSurvey