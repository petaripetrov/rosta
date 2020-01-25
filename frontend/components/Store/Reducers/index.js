import { combineReducers } from 'redux'
import { translationReducer } from './Translation'
import { loginReducer } from './Login'
import { APIReducer } from './API'

const createRootReducer = () => combineReducers({
    translation: translationReducer,
    login: loginReducer,
    api: APIReducer
    // other reducers go here with naming convention | name: nameRouter
})

export default createRootReducer