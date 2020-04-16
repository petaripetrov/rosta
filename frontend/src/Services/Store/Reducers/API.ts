import { Action } from "redux";
import { SET_PENDING_TRUE, SET_PENDING_FALSE, SET_API_ERROR, SET_CANDIDACY_PHOTOS } from "../Actions"

interface APIAction extends Action {
    error: any,
    payload?: any
}

export const APIReducer = (state = { pending: false }, action: APIAction) => {

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
        case SET_CANDIDACY_PHOTOS:

            return {
                ...state,
                photos: action.payload
            }

        default:

            return {
                ...state
            }
    }
}