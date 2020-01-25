import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import createRootReducer from './Reducers'

export function configureStore() {
    const store = createStore(
        createRootReducer(),
        composeWithDevTools(
            applyMiddleware(thunkMiddleware),
        )
    )

    return store
}
