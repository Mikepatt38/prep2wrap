import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ProtectedRoute } from './components/Auth/ProtectedRoute'
import Dashboard from './containers/Dashboard'
import AccountSettings from './containers/AccountSettings'
import UserAuth from './containers/UserAuth'
import UsersPage from './pages/Users'
import Availability from './containers/Availability'
import { JobsPage, CreateJobFormStep1, CreateJobFormStep2 } from './containers/Jobs'
import { NotFound } from './pages/NotFound'
import Tutorial from './pages/Help';

export const Routes = () => {
  return ( 
    <Switch>
      <Route exact path='/login' component={UserAuth} />
      <Route exact path='/signup' component={UserAuth} />
      <Route exact path='/password-reset' component={UserAuth} />
      <ProtectedRoute exact path='/tutorial-walk-through' component={Tutorial} />
      {/* <Route exact path='/password-change' component={PasswordChange} /> */}
      <ProtectedRoute exact path="/" component={Dashboard} />
      <ProtectedRoute exact path='/jobs' component={JobsPage} />
      <ProtectedRoute exact path='/jobs/:jobID/job-information' component={CreateJobFormStep1} />
      <ProtectedRoute exact path='/jobs/:jobID/assign-users' component={CreateJobFormStep2} />
      <ProtectedRoute exact path='/crew' component={UsersPage} />
      <ProtectedRoute exact path='/availability' component={Availability} />
      <ProtectedRoute exact path='/account-settings' component={AccountSettings} />
      <ProtectedRoute component={NotFound} />
    </Switch>
  )
}

      // <ProtectedRoute exact path='/jobs/:jobID/job-overview' component={CreateJobFormStep3} />
      // <ProtectedRoute exact path='/jobs/:jobID/send-job-invites' component={SendJobInvites} />