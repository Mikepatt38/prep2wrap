import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AccountSettings from './containers/AccountSettings'
import UserAuth from './containers/UserAuth'

import Landing from './js/views/Landing'
import PasswordChange from './js/views/PasswordChange'
import UsersPage from './js/views/UsersPage'
import Dashboard from './js/views/Dashboard'

export const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={UserAuth} />
      <Route exact path='/signup' component={UserAuth} />
      <Route exact path='/password-reset' component={UserAuth} />
      <Route exact path='/password-change' component={PasswordChange} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/users' component={UsersPage} />
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