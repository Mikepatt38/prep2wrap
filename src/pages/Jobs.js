import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import JobsList from '../components/Jobs/JobsList'
const uuidv4 = require('uuid/v4')

class Jobs extends Component {
  state = {
    jobID: uuidv4()
  }

  render() {
    return (
      <div className="container">
        <Link to={{
          pathname: `/jobs/${this.state.jobID}/job-information`,
          query: `${this.state.jobID}`
        }}>Create a job</Link> 

        <div className="container">
          <div className="jobs-list">
            <JobsList
              getUserJobs={this.props.getUserJobs}
              currentUser={this.props.currentUser}
            />
          </div>
        </div>
      </div> 

    )
  }
}

export default Jobs