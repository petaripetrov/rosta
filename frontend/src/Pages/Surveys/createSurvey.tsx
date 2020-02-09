import React, { FunctionComponent, useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Survey } from '../../types'


const CreateSurvey: FunctionComponent<{ initial?: Survey }> = ({ initial }) => {

    const { t } = useTranslation()

    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group className="surveyNameGroup">
                        <Form.Label>{t('name')}</Form.Label>
                        <Form.Control as="input" className="nameField" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="descriptionGroup">
                        <Form.Label>{t('description')}</Form.Label>
                        <Form.Control as="textarea" rows="14" className="descriptionField" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="oop">
                        <Form.Label>date</Form.Label>
                        <Form.Control as="time"></Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

export default CreateSurvey