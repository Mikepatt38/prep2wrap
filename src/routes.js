import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ProtectedRoute } from './components/ProtectedRoute'
import AccountSettings from './containers/AccountSettings'
import UserAuth from './containers/UserAuth'
import UsersPage from './containers/Users'
import Availability from './containers/Availability'
import Jobs from './containers/Jobs'

import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import JobsTest from './pages/JobsTest'

export const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={UserAuth} />
      <Route exact path='/signup' component={UserAuth} />
      <Route exact path='/password-reset' component={UserAuth} />
      {/* <Route exact path='/password-change' component={PasswordChange} /> */}
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute exact path='/jobs' component={Jobs} />
      <ProtectedRoute exact path='/users' component={UsersPage} />
      <ProtectedRoute exact path='/availability' component={Availability} />
      <ProtectedRoute exact path='/account-settings' component={AccountSettings} />
    </Switch>
  )
}

export const NonAuthRoutes = () => {
  return (
    <Route exact path='/jobs-test' component={JobsTest} />
  )
}