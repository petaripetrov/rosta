import React from 'react'
import { Landing } from './Pages/Landing/landing'
import { LoginForm, RegisterForm } from './Pages/LoginRegister/loginRegister'
import { Switch, Route } from 'react-router-dom'

function App() {

  return (
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Route exact path="/register">
        <RegisterForm />
      </Route>
    </Switch>
  );
}

export default App;
