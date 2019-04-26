import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import JobsList from '../components/Jobs/JobsList'
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
        <div className="app-page-title">
          <h1>Jobs</h1>
          <Link className="button button-primary" to={{
            pathname: `/jobs/${this.state.jobID}/job-information`,
            query: `${this.state.jobID}`
          }}>Create New Job</Link> 
        </div>

        <div className="app-page-section">
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
          />
        </div>

      </div> 

    )
  }
}

export default Jobs