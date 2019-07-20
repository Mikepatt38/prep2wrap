import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ErrorIllustration from '../../img/illustrations/error.svg'

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // TODO: // Log the error to slack or another system to update me
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="app-page">
          <div className="workspace">
            <div className="workspace-desktop">
              <div className="workspace-tab-list">
                <Link to="/" className="link">Dashboard</Link>
                <Link to="/jobs" className="active">Jobs</Link>
                <Link to="/crew" className="link">Crew</Link>
                <Link to="/availability" className="link">Availability</Link>
                <Link to="/account-settings" className="link">Settings</Link>
              </div>
            </div> 
          </div>      
          <div className="app-page-body">
            <div className="app-page-section">
              {
                this.state.error &&
                <div className="error-state">
                  <img className="error-state-image" src={ErrorIllustration} alt="Error Illustration" />
                  <h3>It seems something went wrong. Please refresh the browser.</h3>
                  <p>There seems to be an error with you're request. We're sorry, try taking a different action and if the problem persist please contact us at <a href="mailto:info@prep2wrapjobs.com">info@prep2wrapjobs.com</a>.</p>
                </div>
              }
            </div>
          </div>
        </div> 
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary