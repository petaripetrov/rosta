import { SELECT_SURVEY, UN_SELECT_SURVEY } from '../Actions'

export const surveyReducer = (state = {}, action) => {

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

        default:

            return {
                ...state
            }
    }
}