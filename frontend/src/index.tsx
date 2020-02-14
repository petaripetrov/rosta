import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faPollH} from '@fortawesome/free-solid-svg-icons'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import './Styles/rosta.css'
import './Styles/index.css'
import 'spectre.css/dist/spectre-exp.min.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { configureStore, history } from './Services/Store'
import { Header, ProgressBar } from './Components'
import './Services/i18n/i18n'


/**
 * Creates a library of SVG icons. Object provided by fontawesome for react
 */
library.add(faBars, faPollH)

/**
 * Create store
 */
const store = configureStore()

/**
 * Pass store variable to provider
 * Connect router to history object
 * Render Header, Toaster and App
 */
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Header />
            <ProgressBar />
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

/**FACEBOOK PUT THIS HERE*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
