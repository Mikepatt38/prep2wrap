import React, { Component } from 'react'
import withAuthorization from '../containers/withAuthorization'
import DashboardNotifications from '../components/General/DashboardNotifications'
import DashboardStatus from '../components/General/DashboardStatus'
import GettingStartedIcon from '../img/icon-getting-started.svg'
import CreateIcon from '../img/icon-create.svg'
import GlassIcon from '../img/icon-glass.svg'
import CalendarIcon from '../img/icon-calendar.svg'

class Dashboard extends Component {
  render() {
    return (
      <div className="app-page">
        <div className="app-page-header">
          <h1>Dashboard</h1>
        </div>

        <div className="app-page-body">
          <DashboardNotifications
            currentUser={this.props.currentUser}
            getUserJobNotifications={this.props.getUserJobNotifications}
            removeUserJobNotification={this.props.removeUserJobNotification}
          />

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