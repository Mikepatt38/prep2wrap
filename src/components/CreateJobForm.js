import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
// import { CreateJobFormStepOne } from './CreateJobFormStepOne'
import { CreateJobFormStepTwo } from './CreateJobFormStepTwo'
import { CreateJobFormStepThree } from './CreateJobFormStepThree'
import { SendSMSTwilio } from './SendSMSTwilio'
const uuidv4 = require('uuid/v4')
   
export class CreateJobForm extends Component {
  state= {
    jobID: uuidv4(),
    step: 0
  }

  assignedUsers = (assignedUsers) => {
    this.setState(prevState => ({
      jobObj: {
        ...prevState.jobObj,
        usersAssigned: assignedUsers
      },
      usersAssigned: assignedUsers
    }))
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
      case 3:
        return <CreateJobFormStepThree
                state={this.state}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                currentUser={this.props.currentUser}
                createJob={this.props.createJob}
              />
      case 4: 
        return (
          <SendSMSTwilio
            users={this.state.usersAssigned}
            jobID={this.state.jobObj.jobID}
            currentUser={this.props.currentUser}
            createJobNotification={this.props.createJobNotification}
            nextStep={this.nextStep}
            errorStep={this.errorStep}
          />
        )
      case 'error':
        return <div>
                <p>Oops! Something went wrong, try recreating your job to fix the error!</p>
              </div>
    }
  
  }
}



