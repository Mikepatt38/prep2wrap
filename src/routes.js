import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AccountSettings from './containers/AccountSettings'
import UserAuth from './containers/UserAuth'
import UsersPage from './containers/Users'
import Availability from './containers/Availability'

import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'

export const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={UserAuth} />
      <Route exact path='/signup' component={UserAuth} />
      <Route exact path='/password-reset' component={UserAuth} />
      {/* <Route exact path='/password-change' component={PasswordChange} /> */}
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/users' component={UsersPage} />
      <Route exact path='/availability' component={Availability} />
      <Route exact path='/account-settings' component={AccountSettings} />
    </Switch>
  )
}

export const NonAuthRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={UserAuth} />
      <Route exact path='/signup' component={UserAuth} />
      <Route exact path='/password-reset' component={UserAuth} />
    </Switch>
  )
}