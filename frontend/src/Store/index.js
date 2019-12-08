import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import createRootReducer from './Reducers'

function configureStore(preloadedState: any) {
    const store = createStore(
        createRootReducer(),
        preloadedState,
        compose(
            applyMiddleware(thunkMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )

    return store
}

const store = configureStore()

export default store