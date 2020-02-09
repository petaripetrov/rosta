import React from 'react'
import { Survey } from '../../types'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

interface selectedSurveyProps {
    selectedSurvey?: Survey
}

const SelectedSurvey = (props: selectedSurveyProps) => {

    const { t } = useTranslation()

    if (props.selectedSurvey) {

        return (
            <Container className="selectedSurveyWrapper">
                <div>{t('name')}</div>
                <div className="nameField">
                    <div>{props.selectedSurvey.name}</div>
                </div>
                <div>{t('description')}</div>
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