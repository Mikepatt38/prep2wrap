import React, { Component } from 'react'
import { FormButton } from './FormButton'
import JobResultsTable from './JobResultsTable'

export class CreateJobFormStepTwo extends Component {

  state = {
    currentPositionsInvited: [],
    usersMatchedResults: [],
    loading: true,
    usersAssigned: [[]]
  }

  componentWillMount() {
    this.props.userResultsForJobCreation(this.props.state.jobObj)
      .then( (results) => {
        this.setState({
          usersMatchedResults: results,
          loading: false
        })
      })
  }

  saveAndContinue = (e) => {
    e.preventDefault()
    this.props.nextStep()
  }

  saveAndGoBack = (e) => {
    e.preventDefault()
    this.props.prevStep()
  }

  assignPosition = (usersAssignedArr) => {
    this.setState({
      usersAssigned: usersAssignedArr
    }, 
    () => {
      this.props.assignedUsers(this.state.usersAssigned)
    })
  }

  render() {
    const { state } = this.props
    return (
      !this.state.loading && this.state.usersMatchedResults.length > 0 &&  
      <div className="card">
        <div className="card-header">
          <h3>Assign Positions to Potential Users</h3>
          <p>Fill out the job details to find the best users for the job.</p>
        </div>
        <div className="card-body">
          <JobResultsTable
            results={this.state.usersMatchedResults}
            setUserModal={this.props.setUserModal}
            userModalActive={this.props.userModalActive}
            positions={state.jobObj.jobPositions}
            assignPosition={this.assignPosition}
          />
          <form className="card-form-general">
            <FormButton
              className="button-form"
              buttonText="Prev Step"
              onClick={this.saveAndGoBack}
            />
            <FormButton
              className="button-form"
              buttonText="Send User Invites"
              onClick={this.saveAndContinue}
            />
          </form>   
        </div>
      </div>
    )
  }
}