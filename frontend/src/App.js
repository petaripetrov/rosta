import React from 'react'
import { Landing } from './Pages/Landing/landing'
import { LoginRegister } from './Pages/LoginRegister/loginRegister'
import { Switch, Route } from 'react-router-dom'

function App() {

  return (
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
  );
}

export default App;
