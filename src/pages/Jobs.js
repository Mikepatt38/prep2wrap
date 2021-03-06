import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { JobsTable } from '../components/Jobs/JobsTable'
const shortid = require('shortid')
// Replacing the - and _ with $ and @ to have better looking URL facing unique id's
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

class Jobs extends Component {
  state = {
    jobID: shortid.generate()
  }

  render() {
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
            <Link className="button button-workspace" to={{
              pathname: `/jobs/${this.state.jobID}/job-information`,
              query: `${this.state.jobID}`
            }}>Create New Job</Link>
          </div> 
        </div>
        
        <div className="app-page-body">
          <div className="app-page-section">
            <div className="mobile-only">
              <Link className="button button-primary" to={{
                pathname: `/jobs/${this.state.jobID}/job-information`,
                query: `${this.state.jobID}`
              }}>Create New Job</Link>
            </div>
            <JobsTable 
              getUserJobs={this.props.getUserJobs}
              currentUser={this.props.currentUser}
              setJobsModal={this.props.setJobsModal}
              deletedCreatedJob={this.props.deletedCreatedJob}
              history={this.props.history}
              completeUserJob={this.props.completeUserJob}
              acceptJobInvitation={this.props.acceptJobInvitation}
              createUserAcceptedJob={this.props.createUserAcceptedJob}
              denyJobInvitation={this.props.denyJobInvitation}
              sendSMSAlerts={this.props.sendSMSAlerts}
            />
          </div>
        </div>
      </div> 

    )
  }
}

export default Jobs