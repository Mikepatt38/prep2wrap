import React, { Component } from 'react'
import withAuthorization from '../containers/withAuthorization'
import DashboardNotifications from '../components/General/DashboardNotifications'
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

        <div className="app-page-section">
          <div className="section-title">
            <h3>Quick Actions:</h3>
          </div>
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <div className="icon"><img src={GettingStartedIcon} alt="Getting Started Icon" /></div>
              <div className="description">
                <h4>Visit Tutorials</h4>
                <p>Get started with how to use the Calltime platform for your career and current jobs.</p>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="icon"><img src={CreateIcon} alt="Getting Started Icon" /></div>
              <div className="description">
                <h4>Create A Job</h4>
                <p>Get started with how to use the Calltime platform for your career and current jobs.</p>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="icon"><img src={GlassIcon} alt="Getting Started Icon" /></div>
              <div className="description">
                <h4>Update Availability</h4>
                <p>Get started with how to use the Calltime platform for your career and current jobs.</p>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="icon"><img src={CalendarIcon} alt="Getting Started Icon" /></div>
              <div className="description">
                <h4>Find A User</h4>
                <p>Get started with how to use the Calltime platform for your career and current jobs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard