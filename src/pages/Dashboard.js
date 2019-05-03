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
        <div className="app-page-title">
          <h1>Welcome, {this.props.currentUser.firstName}</h1>
        </div>
    
        <DashboardNotifications
          currentUser={this.props.currentUser}
          getUserJobNotifications={this.props.getUserJobNotifications}
          removeUserJobNotification={this.props.removeUserJobNotification}
        />

        <DashboardStatus
          currentUser={this.props.currentUser}
          getUserJobCount={this.props.getUserJobCount}
        />

        <div className="app-page-section">
          <div className="section-title">
            <p>Get started with quick actions:</p>
          </div>
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <div className="icon"><img src={GettingStartedIcon} alt="Getting Started Icon" /></div>
              <div className="description">
                <h4>Visit Tutorials</h4>
                <p>Learn the Crew It Up platform.</p>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="icon"><img src={CreateIcon} alt="Getting Started Icon" /></div>
              <div className="description">
                <h4>Create A Job</h4>
                <p>Hire your next crew.</p>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="icon"><img src={GlassIcon} alt="Getting Started Icon" /></div>
              <div className="description">
                <h4>Update Availability</h4>
                <p>Keep your calendar updated.</p>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="icon"><img src={CalendarIcon} alt="Getting Started Icon" /></div>
              <div className="description">
                <h4>Find A User</h4>
                <p>Easily grow your network.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard