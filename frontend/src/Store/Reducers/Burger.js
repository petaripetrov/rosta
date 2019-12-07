import anime from 'animejs'

var isHidden = true;
export const burgerReducer = (state = [], action, burger) => {
    var basicTimeline = anime.timeline();

    switch (action.type) {
        case 'BURGER_TURN':
            if (isHidden) {
                basicTimeline
                    .add({
                        targets: action.ref.current,
                        duration: 400,
                        translateX: 300,
                        easing: 'easeInOutQuad'
                    })
                isHidden = false
                return state
            } else {
                basicTimeline
                    .add({
                        targets: action.ref.current,
                        duration: 400,
                        translateX: 0,
                        easing: 'easeInOutQuad'
                    })
                isHidden = true

                return state

            }
        default:
            return state;
    }
}