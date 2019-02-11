import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ProtectedRoute } from './components/ProtectedRoute'
import Dashboard from './containers/Dashboard'
import AccountSettings from './containers/AccountSettings'
import UserAuth from './containers/UserAuth'
import UsersPage from './pages/Users'
import Availability from './containers/Availability'
import Jobs from './containers/Jobs'
import JobOverview from './containers/JobOverview'

import Landing from './pages/Landing'
import { CreateJobFormStepOne } from './components/CreateJobFormStepOne'
// import Dashboard from './pages/Dashboard'

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
      <ProtectedRoute exact path='/jobs/:jobID/job-information' component={CreateJobFormStepOne} />
      <ProtectedRoute exact path='/jobs/:userID/:jobID' component={JobOverview} />
      <ProtectedRoute exact path='/users' component={UsersPage} />
      <ProtectedRoute exact path='/availability' component={Availability} />
      <ProtectedRoute exact path='/account-settings' component={AccountSettings} />
    </Switch>
  )
}