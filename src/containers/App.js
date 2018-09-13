import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { AuthRoutes, NonAuthRoutes } from '../routes'

import Sidebar from '../components/Sidebar'

import withAuthentication from './withAuthentication'
import Navbar from './Navigation'
import Alert from './Alert'
import Modal from './Modal'

const App = ({ currentUser }) => {
  return (
    <Router>
      {currentUser === null
        ?
          <React.Fragment>
            <Navbar />
            <NonAuthRoutes />
          </React.Fragment>
        :
          <div className="app-container">
            <div className="app-container-sidebar">
              <Sidebar />
            </div>
            <div className="app-container-main">
              <Alert />
              <Modal />
              <div className="app-container-main-body">
                <AuthRoutes />
              </div>
            </div>
          </div>
      }
    </Router>
  )
}



const mapStateToProps = (state) => ({
  currentUser: state.userState.currentUser,
})

export default compose(
  withAuthentication,
  connect(mapStateToProps)
)(App)