import { BURGER_TURN } from '../Actions'

let isHidden = true;
export const burgerReducer = (state = {}, action) => {

    switch (action.type) {
        case BURGER_TURN:
            if (isHidden) {
                isHidden = false

                return {
                    ...state,
                    burgerTurn: !isHidden
                }
            } else {

                isHidden = true

                return {
                    ...state,
                    burgerTurn: !isHidden
                }

            }
        default:
            return state
    }
}