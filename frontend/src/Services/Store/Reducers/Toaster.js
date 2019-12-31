import { TOASTER_DISPLAY } from '../Actions'

export const toasterReducer = (state = {}, action) => {

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