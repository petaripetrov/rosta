import { combineReducers } from 'redux'
import { burgerReducer } from './Burger'

const createRootReducer = () => combineReducers({
    // router: 'none',
    burger: burgerReducer,
    // other reducers go here with naming convention | name: nameRouter
})

export default createRootReducer