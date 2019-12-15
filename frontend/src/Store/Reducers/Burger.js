import anime from 'animejs'

var isHidden = true;
export const burgerReducer = (state = [], action, burger) => {
    var basicTimeline = anime.timeline();

    switch (action.type) {
        case 'BURGER_TURN':
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
            return state;
    }
}