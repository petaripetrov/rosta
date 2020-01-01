import React from 'react'
import {
  Landing,
  LoginForm,
  RegisterForm,
  Menu,
  Surveys,
  Candidacies,
} from './Pages'
import { Switch, Route, Redirect} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  dispatch({ type: 'LOAD_FROM_COOKIES' })

  const isLoggedIn = useSelector(state => state.login.isLoggedIn)

  function AuthorizedRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isLoggedIn ? (
            children) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
        } />
    )
  }

  function NoAuthorizationRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          !isLoggedIn ? (
            children) : (
              <Redirect
                to={{
                  pathname: "/menu",
                  state: { from: location }
                }}
              />
            )
        } />
    )
  }

  return (
    <Switch>
      <NoAuthorizationRoute exact path="/">
        <Landing />
      </NoAuthorizationRoute>
      <NoAuthorizationRoute exact path="/login">
        <LoginForm />
      </NoAuthorizationRoute>
      <NoAuthorizationRoute exact path="/register">
        <RegisterForm />
      </NoAuthorizationRoute>
      <AuthorizedRoute exact path="/menu">
        <Menu />
      </AuthorizedRoute>
      <AuthorizedRoute path="/surveys">
        <Surveys />
      </AuthorizedRoute>
      <AuthorizedRoute exact path="/candidacies">
        <Candidacies />
      </AuthorizedRoute>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch >
  );
}

export default App;
