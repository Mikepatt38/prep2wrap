import React, { Component } from 'react'
import { firebase } from '../../db'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import withAuthentication from './withAuthentication'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Landing from '../views/Landing'
import LoginPage from '../views/LoginPage'
import SignUpPage from '../views/SignUpPage'
import PasswordReset from '../views/PasswordReset'
import PasswordChange from '../views/PasswordChange'
import AccountSettings from '../views/AccountSettings'

import Dashboard from '../views/Dashboard'

class App extends Component {

  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Sidebar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/signup' component={SignUpPage} />
            <Route exact path='/password-reset' component={PasswordReset} />
            <Route exact path='/password-change' component={PasswordChange} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/account-settings' component={AccountSettings} />
          </Switch>
        </React.Fragment>
      </Router>
    )
  }

}

export default withAuthentication(App)
