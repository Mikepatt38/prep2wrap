import React, { Component } from 'react'
import withAuthorization from '../containers/withAuthorization'
import DashboardNotifications from '../components/General/DashboardNotifications';

class Dashboard extends Component {
  render() {
    return (
      <div className="app-page">
        <div className="app-page-title">
          <h1>Welcome, {this.props.currentUser.firstName}</h1>
        </div>
    
        <DashboardNotifications
          currentUser={this.props.currentUser}
          getUserJobNotifications={this.props.getUserJobNotifications}
          removeUserJobNotification={this.props.removeUserJobNotification}
        />
      </div>
    )
  }
}

export default Dashboard