import { DISPATCH_MENU_REQUEST } from '../Actions'

export const menuReducer = (state = {}, action) => {

    switch (action.type) {
        case DISPATCH_MENU_REQUEST:

            return {
                ...state,
                options: ["Vote", "Submit Candidacy", "Submit Survey", "Exit Account"]
            }

        default:
            return state
    }
}