import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const uuidv4 = require('uuid/v4')

class Jobs extends Component {
  state = {
    jobID: uuidv4()
  }

  render() {
    return (
      <Link to={{
        pathname: `/jobs/${this.state.jobID}/job-information`,
        query: `${this.state.jobID}`
      }}>Create a job</Link>  
    )
  }
}

export default Jobs