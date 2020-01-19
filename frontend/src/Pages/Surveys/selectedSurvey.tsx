import React from 'react'
import { Survey } from '../../types'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface selectedSurveyProps {
    selectedSurvey?: Survey
}

const SelectedSurvey = (props: selectedSurveyProps) => {

    console.log(props.selectedSurvey)
    if (props.selectedSurvey) {


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
    } else {
        return (
            null
        )
    }
}

export default SelectedSurvey