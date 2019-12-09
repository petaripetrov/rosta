import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { burgerReducer } from './Burger'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    burger: burgerReducer,
    // other reducers go here with naming convention | name: nameRouter
})

export default createRootReducer