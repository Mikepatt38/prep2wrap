import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class DashboardStatus extends Component {
  state = {
    loading: true,
    createdJobsCount: 0,
    acceptedJobsCount: 0,
    completedJobsCount: 0
  }

  async componentDidMount(){
    const jobData = await this.props.getUserJobCount(this.props.currentUser.id)
    const { createdJobsCount, acceptedJobsCount, completedJobsCount } = jobData
    this.setState({
      createdJobsCount,
      acceptedJobsCount,
      completedJobsCount,
      loading: false
    })
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
                // onChange={onChange} 
                // value={value} 
                checked={false}
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
                <span className="count">{this.props.currentUser.favorites.length}</span>
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

// <React.Fragment>
// <div className="dashboard-status-cards">
//   <div className="status-card">
//     <span className="count">{this.state.createdJobsCount}</span>
//     <span className="description">Jobs<br/>Created</span>
//   </div>
//   <div className="status-card">
//     <span className="count">{this.state.acceptedJobsCount}</span>
//     <span className="description">Jobs<br/>Accepted</span>
//   </div>
//   <div className="status-card">
//     <span className="count">{this.state.completedJobsCount}</span>
//     <span className="description">Jobs<br/>Completed</span>
//   </div>
// </div>
// </React.Fragment>