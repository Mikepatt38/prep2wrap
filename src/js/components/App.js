import React, { Component } from 'react'
// import { firebase } from '../../db'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withAuthentication from './withAuthentication'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Alert from '../components/Alert'
import Landing from '../views/Landing'
import LoginPage from '../views/LoginPage'
import SignUpPage from '../views/SignUpPage'
import PasswordReset from '../views/PasswordReset'
import PasswordChange from '../views/PasswordChange'
import UsersPage from '../views/UsersPage'
import AccountSettings from '../views/AccountSettings'

import Dashboard from '../views/Dashboard'

class App extends Component {

  render() {
    const { authUser, alertActive, onSetAlert } = this.props

    return (
      <Router>
        <React.Fragment>
          <Sidebar />
          <main className="main-content">
            <Alert />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/signup' component={SignUpPage} />
              <Route exact path='/password-reset' component={PasswordReset} />
              <Route exact path='/password-change' component={PasswordChange} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/users' component={UsersPage} />
              <Route exact path='/account-settings' component={AccountSettings} />
            </Switch>
          </main>
          <Navbar />
        </React.Fragment>
      </Router>
    )
  }

}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
})

export default compose(
  withAuthentication,
  connect(mapStateToProps)
)(App)


