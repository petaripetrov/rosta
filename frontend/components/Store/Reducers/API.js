import { SET_PENDING_TRUE, SET_PENDING_FALSE, SET_API_ERROR } from "../Actions"

export const APIReducer = (state = { pending: false }, action) => {

    switch (action.type) {
        case SET_PENDING_TRUE:

            return {
                ...state,
                pending: true
            }

        case SET_PENDING_FALSE:

            return {
                ...state,
                pending: false
            }

        case SET_API_ERROR:

            return {
                ...state,
                error: action.error
            }

        default:

            return {
                ...state
            }
    }
}