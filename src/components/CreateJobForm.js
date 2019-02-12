import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const uuidv4 = require('uuid/v4')
   
export class CreateJobForm extends Component {
  state= {
    jobID: uuidv4(),
    step: 0
  }

  render(){
    switch(this.state.step) {
      case 0:
        return (
          <div className="card">
            <div className="card-header">
              <h3>Create A Job</h3>
              <p>Create a job to hire other local professionals to your project.</p>
              <Link to={{
                pathname: `/jobs/${this.state.jobID}/job-information`,
                query: `${this.state.jobID}`
              }}>Create a job</Link>  
            </div>
          </div>   
        )
      case 'error':
        return <div>
                <p>Oops! Something went wrong, try recreating your job to fix the error!</p>
              </div>
    }
  
  }
}



