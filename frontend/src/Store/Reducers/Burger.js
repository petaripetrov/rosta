import { combineReducers } from 'redux'
import { BURGER_ON, BURGER_OFF } from '../Actions/Burger'

export const burgerReducer =(state = [], action) => {
    switch (action.type) {
        case BURGER_ON:
            return [
                ...state,
                {
                    sidebarMenu: 'shown'
                }
            ]
        case BURGER_OFF:
            return state.map
    }
}