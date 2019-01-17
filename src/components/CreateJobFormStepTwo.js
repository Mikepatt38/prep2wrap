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

  componentDidMount() {
    this.props.userResultsForJobCreation(this.props.state.jobObj)
      .then( (results) => {
        const filterResults = results.filter(user => user.id !== this.props.currentUserID) 
        this.setState({
          usersMatchedResults: filterResults,
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
    if(this.state.loading) return <h1>Loading...</h1>
    const { state } = this.props
    if(this.state.usersMatchedResults.length === 0){
      return (
        <NoResultsTable
          saveAndGoBack={this.saveAndGoBack}
        />
      )
    }
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

const NoResultsTable = ({saveAndGoBack}) => (
  <div className="card">
    <div className="card-header">
      <h3>Assign Positions to Potential Users</h3>
      <p>Fill out the job details to find the best users for the job.</p>
    </div>
    <div className="card-body">
      <p><b>Oh NO!</b> No users matched your search criteria. Try going back and trying new parameters!</p>  
    </div>
    <div className="card-footer">
      <FormButton
        className="button-form"
        buttonText="Prev Step"
        onClick={saveAndGoBack}
      />
    </div>
  </div>  
)