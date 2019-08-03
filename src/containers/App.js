import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Routes } from '../routes'
import withAuthentication from './withAuthentication'
import Alert from './Alert'
import { GlobalAlert } from '../components/General/GlobalAlert'
import AppTopBar from '../components/General/AppTopBar'
import ScrollToTop from '../components/General/ScrollToTop'
import ErrorBoundary from '../components/General/ErrorBoundary';


const App = ({ currentUser }) => {
  return (
    <Router>
      <ScrollToTop>
        <RenderRoute
          currentUser={currentUser}
        />
      </ScrollToTop>
    </Router>
  )
}

const RenderRoute = ({ currentUser }) => (
  <React.Fragment>
    {
      currentUser && window.location.pathname !== '/signup' &&
      <div className="app-container">
        <AppTopBar currentUser={currentUser} />
        { window.location.pathname !== '/tutorial-walk-through' &&<GlobalAlert active={!currentUser.profileInformation} /> }
        <div className="app-body">
          <Alert />
          <div className="app-body-main">
            <ErrorBoundary>
              <Routes />
            </ErrorBoundary>
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
  globalAlertActive: state.sessionState.globalAlertActive
})

export default compose(
  withAuthentication,
  connect(mapStateToProps)
)(App)