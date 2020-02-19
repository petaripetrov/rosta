import { createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

import createRootReducer from './Reducers'

/**
 * Create history object to allow react-router to work better with redux
 * [createBrwoserHistory]{@link https://github.com/supasate/connected-react-router}
 */
export const history = createBrowserHistory()

/**
 * Configure store for creation based on provided middleware and reducers
 * [createStore]{@link https://redux.js.org/api/createstore/}
 * [applyMiddleware]{@link https://redux.js.org/api/applymiddleware#applymiddlewaremiddleware}
 */
export function configureStore() {
    const store = createStore(
        createRootReducer(history),
        composeWithDevTools(
            applyMiddleware(
                thunkMiddleware,
                routerMiddleware(history)),
        )
    )

    return store
}
