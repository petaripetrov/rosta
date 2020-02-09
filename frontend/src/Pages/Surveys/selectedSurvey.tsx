import React from 'react'
import { Survey } from '../../types'
import { useTranslation } from 'react-i18next'

interface selectedSurveyProps {
    selectedSurvey?: Survey
}


/**
 * Renders a survey
 * @param {Object} propes render properties for a survey
 */
const SelectedSurvey = (props: selectedSurveyProps) => {

    const { t } = useTranslation()

    if (props.selectedSurvey) {
        return (
            <div className="selectedSurveyWrapper">
                <div>{t('name')}</div>
                <div className="nameField">
                    <div>{props.selectedSurvey.name}</div>
                </div>
                <div>{t('description')}</div>
                <div className="descriptionField">
                    <div>{props.selectedSurvey.description}</div>
                </div>
            </div>
        )
    } else {
        return (
            null
        )
    }
}

export default SelectedSurvey