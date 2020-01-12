import { FETCH_SURVEYS_PENDING, FETCH_SURVEYS_SUCCESS, FETCH_SURVEYS_ERROR } from '../Actions'
import { Action } from 'redux'
import { Survey } from '../../../types'

const initialState = {
    pending: false,
    surveys: [],
    error: null
}

interface SurveyAction extends Action {
    payload: any,
    surveys: Array<Survey>,
    error: any
}

export const surveyReducer = (state = initialState, action: SurveyAction) => {

    switch (action.type) {
        case FETCH_SURVEYS_PENDING:

            return {
                ...state,
                pending: true
            }

        case FETCH_SURVEYS_SUCCESS:

            return {
                ...state,
                pending: false,
                surveys: action.surveys
            }

        case FETCH_SURVEYS_ERROR:

            return {
                ...state,
                pending: false,
                error: action.error
            }

        default:

            return {
                ...state
            }
    }
}