import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { burgerReducer } from './Burger'
import { translationReducer } from './Translation'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    burger: burgerReducer,
    translation: translationReducer
    // other reducers go here with naming convention | name: nameRouter
})

export default createRootReducer