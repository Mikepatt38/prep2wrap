import React, { Component } from 'react'

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
      <React.Fragment>
        <div className="dashboard-status-cards">
          <div className="status-card">
            <span className="count">{this.state.createdJobsCount}</span>
            <span className="description">Jobs<br/>Created</span>
          </div>
          <div className="status-card">
            <span className="count">{this.state.acceptedJobsCount}</span>
            <span className="description">Jobs<br/>Accepted</span>
          </div>
          <div className="status-card">
            <span className="count">{this.state.completedJobsCount}</span>
            <span className="description">Jobs<br/>Completed</span>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default DashboardStatus