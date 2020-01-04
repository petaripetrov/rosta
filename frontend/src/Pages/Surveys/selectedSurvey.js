import React from 'react'
import { useSelector } from 'react-redux'

export const SelectedSurvey = () => {
    const selectedSurvey = useSelector(state => state.survey.selectedSurvey)

    return (
        <div>
            {`${selectedSurvey}`}
        </div>
    )
}