import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faPollH} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { configureStore, history } from './Services/Store'
import { Header, Toaster } from './Components'
import './Services/i18n/i18n'



library.add(faBars, faPollH)

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Header />
            <Toaster />
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
