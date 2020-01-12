import { TOASTER_DISPLAY } from '../Actions'
import { Action } from 'redux'

interface ToasterAction extends Action{
    payload: {
        color: string,
        message: string
    }
}

export const toasterReducer = (state = {}, action: ToasterAction) => {

    switch (action.type) {
        case TOASTER_DISPLAY:

            return {
                ...state,
                color: action.payload.color,
                message: action.payload.message
            }

        default:
            return state
    }
}