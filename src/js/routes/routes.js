import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Navbar from '../components/Navbar'
import App from '../components/App'
import Login from '../components/Login'
import Signup from '../components/Signup'

import Dashboard from '../views/Dashboard'

class Routes extends Component {

  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/dashboard' component={Dashboard} />
          </Switch>
        </React.Fragment>
      </Router>
    )
  }

}

export default Routes
