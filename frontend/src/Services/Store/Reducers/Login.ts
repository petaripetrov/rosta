import { LOGIN_USER, LOGOUT_USER, LOAD_FROM_COOKIES, SET_USER_ROLE } from '../Actions'
import { Action } from 'redux'

interface LoginAction extends Action {
    payload?: string
}

export const loginReducer = (state = { isLoggedIn: false, role: null }, action: LoginAction) => {

    switch (action.type) {
        case LOGIN_USER:

            var d = new Date()

            document.cookie = `authcode=(${action.payload});expires=${d.setTime(d.getTime() + (8 * 60 * 60 * 1000))};path=/;`

            return {
                ...state,
                isLoggedIn: true,
            }

        case LOGOUT_USER:
            document.cookie = `authcode=(test);expires=01 Jan 2000;path=/;`

            return {
                ...state,
                isLoggedIn: false,
                authCode: undefined,
                role: undefined
            }

        case LOAD_FROM_COOKIES:

            let authCodeExpression = /\(([^\)]+)\)/
            let authCode = authCodeExpression.exec(document.cookie)
            if (authCode) {
                return {
                    ...state,
                    isLoggedIn: true,
                    authCode: authCode[1],
                }
            } else {
                return {
                    ...state,
                    isLoggedIn: false,
                    options: []
                }
            }

        case SET_USER_ROLE:

            return{
                ...state,
                role: action.payload
            }

        default:
            return state
    }
}