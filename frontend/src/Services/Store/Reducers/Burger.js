import { BURGER_TURN } from '../Actions'

let isHidden = true;
export const burgerReducer = (state = {}, action) => {

    switch (action.type) {
        case BURGER_TURN:
            if (isHidden) {
                isHidden = false

                return {
                    ...state,
                    burgerState: !isHidden
                }
            } else {

                isHidden = true

                return {
                    ...state,
                    burgerState: !isHidden
                }

            }
        default:
            return state
    }
}