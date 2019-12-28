import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { burgerReducer } from './Burger'
import { translationReducer } from './Translation'
import { toasterReducer } from './Toaster'
import { loginReducer } from './Login'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    burger: burgerReducer,
    translation: translationReducer,
    toast: toasterReducer,
    login: loginReducer
    // other reducers go here with naming convention | name: nameRouter
})

export default createRootReducer