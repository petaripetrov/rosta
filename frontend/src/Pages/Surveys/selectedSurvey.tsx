import React from 'react'
import { Redirect } from 'react-router-dom'
import { Survey } from '../../types'
import { Row, Container } from 'react-bootstrap'

interface selectedSurveyProps {
    selectedSurvey: Survey
}

const SelectedSurvey = (props: selectedSurveyProps) => {

    console.log(props.selectedSurvey)
    if (props.selectedSurvey === null) {

        return (
            <Redirect to="/surveys" />
        )
    } else {

        return (
            <Container className="selectedSurveyWrapper">
                <div>Name</div>
                <div className="nameField">
                    <div>{props.selectedSurvey.name}</div>
                </div>
                <div>Description</div>
                <div className="descriptionField">
                    <div>{props.selectedSurvey.description}</div>
                </div>
            </Container>
        )
    }
}

export default SelectedSurvey