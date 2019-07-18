import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import dateFns from "date-fns"

class DashboardStatus extends Component {
  state = {
    createdJobsCount: this.props.currentUser.createdJobs,
    acceptedJobsCount: this.props.currentUser.acceptedJobs,
    completedJobsCount: this.props.currentUser.completedJobs,
    checked: this.props.currentUser.availability ? 
      this.props.currentUser.availability.some( el => el.date === moment().format('MM/DD/YYYY'))
      : false
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.currentUser !== this.props.currentUser){
      this.setState({
        createdJobsCount: this.props.currentUser.createdJobs,
        acceptedJobsCount: this.props.currentUser.acceptedJobs,
        completedJobsCount: this.props.currentUser.completedJobs,
      })
    }
  }

  handleCheckboxChange = (e) => {
    this.setState({ checked: e.target.checked })
    const checked = e.target.checked
    const currentDate = moment().format('MM/DD/YYYY')
    const userAvailability = this.props.currentUser.availability ? this.props.currentUser.availability : []
    if(checked){
      this.props.updateUserAvailability(this.props.currentUser.id, userAvailability, currentDate, 'Unavailable Today', 'Personal')
    }
    else {
      console.log('remove')
      this.props.removeAvailabilityDate(this.props.currentUser.id, userAvailability, currentDate)
    }
  }

  render() {
    if(this.state.loading) return <p>Loading...</p>
    return (
      <div className="app-page-section" id="section-grid">
        <div className="card card-grid">
          <div className="card-body">
            <h4>Jobs Overview</h4>
            <p>Here is a quick overview of the jobs you have created, completed, and accepted to be apart of.</p>
            <div className="dashboard-status-cards">
              <div className="status-card">
                <span className="count">{this.state.createdJobsCount}</span>
                <span className="description">Jobs Created</span>
              </div>
              <div className="status-card">
                <span className="count">{this.state.acceptedJobsCount}</span>
                <span className="description">Jobs Accepted</span>
              </div>
              <div className="status-card">
                <span className="count">{this.state.completedJobsCount}</span>
                <span className="description">Jobs Completed</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card card-grid card-grid--vertical">
          <div className="card-body">
            <div className="card-body-header">
              <h4>Daily Availability</h4>
              <Link to="/availability" className="button">Manage Schedule</Link>
            </div>
            <p>Easily update your daily availability to keep crew members up to date with your schedule.</p>
            <div className="checkbox-reg-wrapper">
              <input 
                type="checkbox" 
                id="availability-checkbox" 
                onChange={this.handleCheckboxChange} 
                value={this.state.checked}
                checked={this.state.checked}
              />
              <label className="checkbox-regular" htmlFor="availability-checkbox">I am unavailable today.</label>
            </div>
          </div>
        </div>
        <div className="card card-grid card-grid--vertical">
          <div className="card-body">
            <div className="card-body-header">
              <h4>Quick Crew</h4>
              <Link to="/users" className="button">Search Crew</Link>
            </div>
            <p>Keep track of your quick crew to continue to grow your network.</p>
            <div className="dashboard-status-cards">
              <div className="status-card status-card-lg">
                <span className="count">{this.props.currentUser.favorites ? this.props.currentUser.favorites.length : '0'}</span>
                <span className="description">Quick Crew Members</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardStatus