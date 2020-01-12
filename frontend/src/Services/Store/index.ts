import { createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

import createRootReducer from './Reducers'

export const history = createBrowserHistory()

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
