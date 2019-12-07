import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import createRootReducer from './Reducers'

function configureStore(preloadedState: any) {
    const store = createStore(
        createRootReducer(),
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    )

    return store
}

const store = configureStore()

export default store;