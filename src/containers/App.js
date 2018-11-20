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
import UserProfileModal from './UserProfileModal'

const App = ({ currentUser }) => {
  return (
    <Router>
      {currentUser === null
        ?
          <div>
            <AuthRoutes />
          </div>
        :
          <div className="app-container">
            <Alert />
            <Modal />
            <UserProfileModal />
            <Navbar />
            <div className="app-container-main-body">
              <AuthRoutes />
            </div>
          </div>
      }
    </Router>
  )
}

// <div className="app-container">
// <div className="app-container-sidebar">
//   <Sidebar />
// </div>
// <div className="app-container-main">
//   <Alert />
//   <Modal />
//   <UserProfileModal />
//   <div className="app-container-main-body">
//     <AuthRoutes />
//   </div>
// </div>
// </div>



const mapStateToProps = (state) => ({
  currentUser: state.userState.currentUser,
})

export default compose(
  withAuthentication,
  connect(mapStateToProps)
)(App)