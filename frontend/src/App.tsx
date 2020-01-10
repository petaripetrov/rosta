import React, { ReactChildren } from 'react'
import {
  Landing,
  // LoginForm,
  // RegisterForm,
  // Menu,
  // Surveys,
  Candidacies,
} from './Pages'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'

function App() {
  const dispatch = useDispatch()
  dispatch({ type: 'LOAD_FROM_COOKIES' })

  const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn)

  interface test {
    children: any,
    path: string
  }

  const AuthorizedRoute: React.FC<test> = ({ children, path }) => {
    return (
      <Route
        path={path}
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

  const NoAuthorizationRoute: React.FC<test> = ({ children, path}) => {
    return (
      <Route
        path={path}
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
    <Container fluid className="appContainer">
      <Switch>
        <NoAuthorizationRoute /*exact*/ path="/">
          <Landing />
        </NoAuthorizationRoute>
        <NoAuthorizationRoute /*exact*/ path="/login">
          {/* <LoginForm /> */}
        </NoAuthorizationRoute>
        <NoAuthorizationRoute /*exact*/ path="/register">
          {/* <RegisterForm /> */}
        </NoAuthorizationRoute>
        <AuthorizedRoute /*exact*/ path="/menu">
          {/* <Menu /> */}
        </AuthorizedRoute>
        <AuthorizedRoute path="/surveys">
          {/* <Surveys /> */}
        </AuthorizedRoute>
        <AuthorizedRoute /*exact*/ path="/candidacies">
          {/* <Candidacies /> */}
        </AuthorizedRoute>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch >
    </Container>
  );
}

export default App;
