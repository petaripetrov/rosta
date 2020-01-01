import React from 'react'
import {
  Landing,
  LoginForm,
  RegisterForm,
  Menu,
  Surveys,
  Candidacies
} from './Pages'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  dispatch({ type: 'LOAD_FROM_COOKIES' })

  const isLoggedIn = useSelector(state => state.login.isLoggedIn)

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isLoggedIn ? (
            children) : (
              <Redirect
                to={{
                  pathname: "/test",
                  state: { from: location }
                }}
              />
            )
        } />
    )
  }

  return (
    <Switch>
      <Route exact path="/">
        <Landing isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/login">
        <LoginForm isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/register">
        <RegisterForm isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/menu">
        <Menu isLoggedIn={isLoggedIn} />
      </Route>
      <PrivateRoute path="/surveys">
        <Surveys />
      </PrivateRoute>
      <Route exact path="/candidacies">
        <Candidacies isLoggedIn={isLoggedIn} />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch >
  );
}

export default App;
