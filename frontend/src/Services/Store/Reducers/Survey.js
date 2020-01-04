import { SELECT_SURVEY, UN_SELECT_SURVEY, FETCH_SURVEYS_PENDING, FETCH_SURVEYS_SUCCESS, FETCH_SURVEYS_ERROR } from '../Actions'

const initialState = {
    pending: false,
    surveys: [],
    error: null
}

export const surveyReducer = (state = initialState, action) => {

    switch (action.type) {
        case SELECT_SURVEY:

            return {
                ...state,
                selectedSurvey: action.payload
            }

        case UN_SELECT_SURVEY:

            return {
                ...state,
                selectedSurvey: null
            }

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