export const getBurgerNavState = store => store.burgerNavState

export const getBurgerNav = store => getBurgerNavState(store) ? {...getBurgerNavState(store).burgerNavState} : {}