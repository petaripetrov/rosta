import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faBars } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import { Header } from './Components/header'
import * as serviceWorker from './serviceWorker';

library.add(faCoffee, faBars);


ReactDOM.render(
    <div>
        <Header />
        <App />
    </div>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
