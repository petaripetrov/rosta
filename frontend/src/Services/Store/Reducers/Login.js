import { LOGIN_USER } from '../Actions'

let placeHolderSoICanSetUpLogicForWhenTheApiIsDone = false
export const loginReducer = (state = { isLoggedIn: false}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            if (!placeHolderSoICanSetUpLogicForWhenTheApiIsDone) {

                // document.cookie = ``
                return {
                    ...state,
                    isLoggedIn: true,
                    options: ["Surveys", "Submit Candidacy", "Submit Survey", "Exit Account"]
                }
            } else {
                placeHolderSoICanSetUpLogicForWhenTheApiIsDone = true

                return {
                    ...state,
                    isLoggedIn: false
                }
            }

        default:
            return state
    }
}