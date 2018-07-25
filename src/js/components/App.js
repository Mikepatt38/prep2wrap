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

const AuthUserApp = () => {
  return (
    <div className="app-container">
      <div className="app-container-sidebar">
        <Sidebar />
      </div>
      <div className="app-container-main">
        <Alert />
        <Navbar />
        <div className="app-container-main-body">
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
        </div>
      </div>
    </div>
  )
}

const NonAuthUserSite = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/signup' component={SignUpPage} />
        <Route exact path='/password-reset' component={PasswordReset} />
      </Switch>
    </React.Fragment>
  )
}

class App extends Component {

  render() {
    const { authUser } = this.props

    return (
      <Router>
        { authUser 
          ? <AuthUserApp />
          : <NonAuthUserSite />
        }
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


