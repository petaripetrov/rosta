import React from 'react';
import { Landing } from './Pages/Landing/landing'
import { LoginRegister } from './Pages/LoginRegister/loginRegister'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './Store'


function App() {

  return (
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/login">
            <LoginRegister type="login" />
          </Route>
          <Route exact path="/register">
            <LoginRegister type="register" />
          </Route>
        </Switch>
      </BrowserRouter>
    </ConnectedRouter>
  );
}

export default App;
