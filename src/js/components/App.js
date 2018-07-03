import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Navbar from '../components/Navbar'
import Landing from '../views/Landing'
import LoginPage from '../views/LoginPage'
import SignUpPage from '../views/SignUpPage'

import Dashboard from '../views/Dashboard'

class Routes extends Component {

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

export default Routes
