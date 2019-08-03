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
    setTimeout(function() {
      window.location.reload();
    }, 10000);
    // TODO: // Log the error to slack or another system to update me
  }

  componentWillUnmount = () => {
    if(this.resetPage) {
      this.resetPage = 0
    }
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="app-page">
          <div className="workspace">
            <div className="workspace-desktop">
              <div className="workspace-tab-list">
                <Link to="/" className="link">Dashboard</Link>
                <Link to="/availability" className="link">Availability</Link>
                <Link to="/jobs" className="active">Jobs</Link>
                <Link to="/crew" className="link">Crew</Link>
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
                  <h3>It seems something went wrong. We will refresh your browser in 10 seconds automatically.</h3>
                  <p>Oops, something went wrong on our part. We will attempt to reload the browser in 5 seconds or you may do it now. If you continue to see the error, navigate to another page and wait for the browser to reload</p>
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