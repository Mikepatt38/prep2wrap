import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Routes } from '../routes'

import Sidebar from '../components/General/Sidebar'

import withAuthentication from './withAuthentication'
import Navbar from './Navigation'
import Alert from './Alert'
import Modal from './Modal'
import UserProfileModal from './UserProfileModal'
import { DashboardFooter } from '../components/General/DashboardFooter'

const App = ({ currentUser }) => {
  return (
    <Router>
      <RenderRoute
        currentUser={currentUser}
      />
    </Router>
  )
}

const RenderRoute = ({ currentUser }) => (
  <React.Fragment>
    {
      currentUser &&
      <div className="app-container">
        <div className="app-container-sidebar">
          <Sidebar />
        </div>
        <div className="app-container-main">
          <Alert />
          <Modal />
          <UserProfileModal />
          <div className="app-container-main-body">
            <Routes />
          </div>
        </div>
      </div>
    }
    {
      !currentUser &&
      <Routes />
    }
  </React.Fragment>
)

const mapStateToProps = (state) => ({
  currentUser: state.accountState.currentUser,
})

export default compose(
  withAuthentication,
  connect(mapStateToProps)
)(App)