import React, { FunctionComponent, useEffect } from 'react'
import {
  Landing,
  LoginForm,
  RegisterForm,
  Menu,
  Dashboard,
  Candidacies,
} from './Pages'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

/**
 * Renders an App shell that renders application pages
 */
const App: FunctionComponent = () => {

  const authCode = useSelector((state: any) => state.login.authCode)
  const dispatch = useDispatch()

  dispatch({ type: 'LOAD_FROM_COOKIES' })

  useEffect(() => {
    fetch('https://localhost:44375/roleCheck', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authCode}`
      }
    }).then(response => response.json())
      .then(response => {
        if (response.error) {
          throw (response.error)
        }
        dispatch({
          type: 'SET_USER_ROLE',
          payload: response.role
        })
      })
      .catch(error => {
        console.error(error)
      })
  }, [authCode])

  /**
   * Checks with global state that a user is logged in
   */
  const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn)

  interface RouteInterface {
    children: any,
    exact: boolean,
    path: string
  }

  /**
   * Returns functional component which renders out a page only if a user is logged in. If a user is not logged in this element redirects to the '/login' page.
   * @param {Object} RouteParams - Route params
   * @param {any} children - component/s to render
   * @param {boolean} exact - if the route is exact or not (match only to the given route and simular routes @example /path vs /path/secondPath
   * @param {string} path - path to render at
   */
  const AuthorizedRoute: React.FC<RouteInterface> = ({ children, exact, path }) => {

    if (exact) {
      return (
        <Route
          exact
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
    } else {
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
          }
        />
      )
    }
  }

  /**
  * Returns functional component which renders out a page only if a user is not logged in. If a user is logged in this route redirects to the '/menu' page.
  * @param {Object} RouteParams - Route params
  * @param {any} children - component/s to render
  * @param {boolean} exact - if the route is exact or not (match only to the given route and simular routes @example /path vs /path/secondPath
  * @param {string} path - path to render at
  */
  const NoAuthorizationRoute: React.FC<RouteInterface> = ({ children, path }) => {
    return (
      <Route
        exact
        path={path}
        render={({ location }) =>
          !isLoggedIn ? (
            children) : (
              <Redirect
                to={{
                  pathname: "/dashboard",
                  state: { from: location }
                }}
              />
            )
        } />
    )
  }

  /**
   * Returns a tree of routes encased in a container div and Switch element. Switch element is provided by 'react-router' and handles route switching.
   * Additionally has 'catch all' route who redirects to the landing page
   */
  return (
    <div className="container">
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
        <AuthorizedRoute exact={false} path="/dashboard">
          <Dashboard />
        </AuthorizedRoute>
        <AuthorizedRoute exact={false} path="/candidacies">
          <Candidacies />
        </AuthorizedRoute>
        <AuthorizedRoute exact={false} path="/dashboard">
          <div>Dashboard</div>
        </AuthorizedRoute>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch >
    </div>
  );
}

export default App
