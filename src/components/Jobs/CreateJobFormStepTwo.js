import React, { Component } from 'react'
import { FormButton } from '../Forms/FormButton'
import JobResultsTable from './JobResultsTable'
import { CreateJobFormError } from './CreateJobFormError'

class CreateJobFormStepTwo extends Component {

  state = {
    jobID: this.props.match.params.jobID,
    currentPositionsInvited: [],
    loading: true,
    usersAssigned: [],
    error: false
  }

  componentDidMount() {
    if(!this.props.currentJob.jobObj){
      this.setState({
        pageError: true,
        loading: false
      })
    }
    else {
      this.props.userResultsForJobCreation(this.props.currentUser.id.toString(), this.props.currentJob.jobObj)
      .then( (results) => {
        this.setState({
          usersMatchedResults: results,
          loading: false,
          resultsSuccessfullyLoaded: results.length > 0,
          noUsersReturned: results.length === 0
        })
      })
    }
  }
 
  assignPosition = (usersAssignedArr) => {
    this.setState({
      usersAssigned: usersAssignedArr,
      error: false
    })
  }

  sendSMSAlert = (users) => {
    let promises = []

    users.map( user => {
      let userSMSMsg = `${user.name}, you have been invited to a crew as a ${user.position}.`
      promises.push(this.props.createPendingJob(user.id, this.props.currentJob.jobObj.jobID, this.props.currentJob.assignedUsers))
      promises.push(this.props.sendSMSAlerts(user.number, userSMSMsg))
      promises.push(this.sendJobNotificationLink(user.id, user.name, user.position, this.props.currentJob.jobObj.jobID))
    })

    Promise.all(promises).then( () => this.props.history.push("/jobs"))
    .catch( (error) => console.log(error.message))
  }

  sendJobNotificationLink = (userID, userName, userPosition, jobID) => {
    const jobNotificationData = {
      text: `${userName}, you're invited to join a crew as a ${userPosition}`,
      type: 'invite'
    }
    this.props.createUserJobNotification(userID, jobID, jobNotificationData)
  }

  updateAssignedUsers(users){
    let promises = []
    promises.push(this.props.updateReduxJobAssignedUsers(users))
    return Promise.all(promises).then(() => this.props.currentJob.assignedUsers)
  }

  saveAndContinue = async () => {
    let sendSMSSuccess
  
    if(this.validateAssignedUsers()){
      let newAssignedUsers = await this.updateAssignedUsers(this.state.usersAssigned)
      let jobCreated = await this.props.createJob(this.props.currentUser.id.toString(), this.props.currentJob.jobObj.jobID.toString(), this.props.currentJob.jobObj, newAssignedUsers)
      if(jobCreated) sendSMSSuccess = await this.sendSMSAlert(this.state.usersAssigned)
    }
  }

  saveAndGoBack(e){
    e.preventDefault()
    this.props.history.push(`/jobs/${this.state.jobID}/job-information`)
  }

  cancelJobCreation(e){
    e.preventDefault()
    this.props.createReduxJob({})
    this.props.history.push('/jobs')
  }

  validateAssignedUsers = () => {
    let validated = true
    if(this.state.usersAssigned.length === 0){
      this.setState({
        error: true
      })
      validated = false
    }
    return validated
  }
 
  render() {
    if(this.state.pageError) { 
      return <CreateJobFormError 
              title="There was an error"
              errorMessage="It looks like there was a problem while creating your job. Please start over creating your job."
      /> 
    }

    return (  
      <div className="app-page">
        <div className="app-page-header">
          <h1>Assign Job Positions</h1>
        </div>

        <div className="app-page-body">
          {
            this.state.loading &&
            <div className="app-page-section">
              <p>Loading...</p>
            </div>
          }
          {
            this.state.noUsersReturned &&
            <div className="app-page-section">
              <p>No users matched your search criteria. Try going back and trying new parameters!</p>
            </div>
          }
          {
            this.state.resultsSuccessfullyLoaded &&
            <JobResultsTable
              results={this.state.usersMatchedResults}
              setUserModal={this.props.setUserModal}
              userModalActive={this.props.userModalActive}
              assignPosition={this.assignPosition}
              jobData={this.props.currentJob.jobObj}
              jobID={this.props.match.params.jobID}  
              error={this.state.error}  
            />
          }
          <div className="job-form-navigation">
            <div className="buttons-left">
              <FormButton
                className="button-danger"
                buttonText="Cancel"
                onClick={(e) => this.cancelJobCreation(e)}
              />
            </div>
            <div className="buttons-right">
              <FormButton
                className="button-secondary"
                buttonText="Start Over"
                onClick={(e) => this.saveAndGoBack(e)}
              />
              <FormButton
                className="button-primary"
                buttonText="Send Job Invites"
                onClick={this.saveAndContinue}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateJobFormStepTwo