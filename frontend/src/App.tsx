import React, { Component } from 'react'
import {
  Landing,
  LoginForm,
  RegisterForm,
  Menu,
  Dashboard,
  Candidacies,
} from './Pages'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, connect } from 'react-redux'

interface RouteInterface {
  children: any,
  exact: boolean,
  path: string
}

/**
 * Returns functional component which renders out a page only if a user is not logged in. If a user is logged in this route redirects to the '/menu' page.
 * @param {Object} RouteParams - Route params
 * @param {any} children - component/s to render
 * @param {boolean} exact - if the route is exact or not (match only to the given route and simular routes @example /path vs /path/secondPath
 * @param {string} path - path to render at
 */
const NoAuthorizationRoute: React.FC<RouteInterface> = ({ children, path }) => {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn)

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
 * Returns functional component which renders out a page only if a user is logged in. If a user is not logged in this element redirects to the '/login' page.
 * @param {Object} RouteParams - Route params
 * @param {any} children - component/s to render
 * @param {boolean} exact - if the route is exact or not (match only to the given route and simular routes @example /path vs /path/secondPath
 * @param {string} path - path to render at
 */
const AuthorizedRoute: React.FC<RouteInterface> = ({ children, exact, path }) => {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn)


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

interface AppProps {
  authCode: string,
  loadFromCookies: Function,
  setCandidacyPhotos: Function
}
/**
 * Renders an App shell that renders application pages
 */
class App extends Component<AppProps> {

  constructor(props: any) {
    super(props)
  }

  componentDidMount() {

    if (!this.props.authCode) {
      this.props.loadFromCookies()
    }


  }

  componentDidUpdate(prev:any) {
    console.log(prev)
    fetch("https://localhost:44375/getAllCandidacyPhotos", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.authCode}`
      }
    }).then(response => response.json())
      .then(data => this.props.setCandidacyPhotos())
      .catch(error => console.log(error))
  }


  /**
   * Returns a tree of routes encased in a container div and Switch element. Switch element is provided by 'react-router' and handles route switching.
   * Additionally has 'catch all' route who redirects to the landing page
   */
  render() {
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
    )
  }
}

const mapStateToProps = function (state: any) {
  return {
    authCode: state.user.authCode,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadFromCookies: () => dispatch({ type: 'LOAD_FROM_COOKIES' }),
    setCandidacyPhotos: (photos: any) => dispatch({type: 'SET_CANDIDACY_PHOTOS', payload: photos})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
