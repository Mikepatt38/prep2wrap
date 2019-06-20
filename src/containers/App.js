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
import JobsModal from './JobsModal'
import { DashboardFooter } from '../components/General/DashboardFooter'
import { GlobalAlert } from '../components/General/GlobalAlert'
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
      currentUser && window.location.pathname !== '/signup' &&
      <div className="app-container">
        <div className="app-container-sidebar">
          <Sidebar />
        </div>
        <div className="app-container-main">
          <GlobalAlert active={currentUser.profileInformation ? false : true} />
          <Alert />
          <div className="app-container-main-body">
            <Routes />
          </div>
        </div>
      </div>
    }
    {
      (!currentUser || window.location.pathname === '/signup') &&
      <React.Fragment>
        <Routes />
      </React.Fragment>
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