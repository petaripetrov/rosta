import React, { useState, useEffect } from 'react'
import { Survey, Option, Vote } from '../../types'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

interface selectedSurveyProps {
    selectedSurvey?: Survey
}

interface surveyInput {
    surveyId: number | undefined
    optionId: number | undefined
}

/**
 * Renders a survey
 * @param {Object} propes render properties for a survey
 */
const SelectedSurvey = (props: selectedSurveyProps) => {

    const { t } = useTranslation()
    const [voteState, setVoteState] = useState<surveyInput>()
    const authCode = useSelector((state: any) => state.login.authCode)

    function submitVote() {

        fetch('https://localhost:44375/submitVote', {
            method: 'POST',
            body: JSON.stringify(voteState),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authCode}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(`Request rejected with status ${response.status}`)
            }
        }).catch(error => console.log(error))
    }

    const selectedSurveyOptions =
        props.selectedSurvey?.options?.map((option: Option, ) =>
            <label className="form-radio">
                <input type="radio" name="option" key={option.id} className="radio optionButton" onClick={() => {
                    setVoteState({
                        optionId: option?.id,
                        surveyId: props.selectedSurvey?.id
                    })
                }}>
                </input>
                <i className="form-icon">
                </i>{option.name}
            </label>
        )

    if (props.selectedSurvey) {
        return (
            <form className="form-horizontal selectedSurvey p-centered">
                <div className="form-group">
                    <div className="form-label mx-2">{t('name')}</div>
                    <div className="nameField">
                        <div className="mx-2">{props.selectedSurvey.name}</div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-label mx-2">{t('description')}</div>
                    <div className="descriptionField">
                        <div className="mx-2">{props.selectedSurvey.description}</div>
                    </div>
                </div>
                <div className="form-group">
                    {selectedSurveyOptions}
                </div>
                <div>
                    <button className="btn p-centered selectedSurveySubmit" onClick={(event) => {
                        event.preventDefault()
                        submitVote()
                    }}>Submit</button>
                </div>
            </form>
        )
    } else {
        return (
            null
        )
    }
}

export default SelectedSurvey