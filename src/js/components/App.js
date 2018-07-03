import React, { Component } from 'react'
import { firebase } from '../../db'
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

class App extends Component {
  state = {
    authUser: null
  }

  componentDidMount = () => {
    firebase.auth.onAuthStateChanged( authUser => {
      authUser 
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }))
    })
  }

  render() {
    const { authUser } = this.state
    return (
      <Router>
        <React.Fragment>
          <Navbar authUser={authUser} />
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

export default App
