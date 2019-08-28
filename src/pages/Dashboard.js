import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DashboardNotifications from '../components/General/DashboardNotifications'
import DashboardStatus from '../components/General/DashboardStatus'

class Dashboard extends Component {
  render() {
    return (
      <div className="app-page">
        <div className="workspace">
          <div className="workspace-desktop">
            <div className="workspace-tab-list">
              <Link to="/" className="active">Dashboard</Link>
              <Link to="/availability" className="link">Availability</Link>
              <Link to="/jobs" className="link">Jobs</Link>
              <Link to="/crew" className="link">Crew</Link>
              <Link to="/account-settings" className="link">Settings</Link>
            </div>
          </div>
        </div>

        <div className="app-page-body">
          <div className="app-page-section">
            <DashboardNotifications
              currentUser={this.props.currentUser}
              getUserJobNotifications={this.props.getUserJobNotifications}
              removeUserJobNotification={this.props.removeUserJobNotification}
            />
          </div>

          <DashboardStatus
            currentUser={this.props.currentUser}
            getUserJobCount={this.props.getUserJobCount}
            updateUserAvailability={this.props.updateUserAvailability}
            removeAvailabilityDate={this.props.removeAvailabilityDate}
          />
        </div>
      </div>
    )
  }
}

export default Dashboard