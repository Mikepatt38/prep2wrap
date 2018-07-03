import React, { Component } from 'react'
import { firebase } from '../../db'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import withAuthentication from './withAuthentication'

import Navbar from '../components/Navbar'
import Landing from '../views/Landing'
import LoginPage from '../views/LoginPage'
import SignUpPage from '../views/SignUpPage'

import Dashboard from '../views/Dashboard'

class App extends Component {

  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/signup' component={SignUpPage} />
            <Route exact path='/dashboard' component={Dashboard} />
          </Switch>
        </React.Fragment>
      </Router>
    )
  }

}

export default withAuthentication(App)
