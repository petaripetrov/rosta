import { createStore } from 'redux'
import rootReducer from './Reducers/Burger'

const store = createStore(rootReducer);

export default store;