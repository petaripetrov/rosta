import React from 'react'
import { Landing, LoginForm, RegisterForm, Menu, Surveys, SubmitCandidacy, SubmitSurvey } from './Pages'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  dispatch({ type: 'LOAD_FROM_COOKIES' })

  const isLoggedIn = useSelector(state => state.login.isLoggedIn)

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
      <Route exact path="/surveys">
        <Surveys isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/submitcandidacy">
        <SubmitCandidacy isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/submitsurvey">
        <SubmitSurvey isLoggedIn={isLoggedIn} />
      </Route>
      <Route path="*">
        <Redirect to="/"/>
      </Route>
    </Switch >
  );
}

export default App;
