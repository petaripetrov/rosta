import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from './Reducers'

export const history = createBrowserHistory()

function configureStore(preloadedState: any) {
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        compose(
            applyMiddleware(
                thunkMiddleware,
                routerMiddleware(history)),
        )
    )

    return store
}

const store = configureStore()

export default store