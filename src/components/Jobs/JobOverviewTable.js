import React, { Component } from 'react'

class JobOverviewTable extends Component {
  state = {
    loading: true
  }

  componentDidMount = () => {
    const path = window.location.pathname
    const result = path.split("/")
    const creatorID = result[2]
    const jobID = result[3]
    this.props.getJobOverviewData(creatorID, jobID)
      .then((result) => {
        this.setState({
          jobOverviewData: result !== "error" ? result : {},
          loading: false,
          pageError: result === "error" ? true : false
        })
      })
  }

  testIfCurrentUserIsAssigned = (currentUserId) => {
    let isUserAssigned = false
    this.state.jobOverviewData.usersAssigned.map( user => {
      if(user.id === currentUserId) {
        isUserAssigned = true
      }
    })
    return isUserAssigned
  }
  
  testIfCurrentUserAccepted = (currentUserId) => {
    let userAccepted = false
    this.state.jobOverviewData.usersAssigned.map( user => {
      if(user.id === currentUserId) {
        userAccepted =  user.status === "pending" ? false : true
      }
    })
    return userAccepted
  }

  testIfCurrentUserIsCreator = (currentUserID) => {
    if(this.state.jobOverviewData.jobCreatorID === currentUserID) {
      return true
    }
    return false
  }

  updateUsersJobDates = (newDates) => {
    const { currentUser } = this.props
    let newDatesArr = []
    newDates.map(currentDate => {
      newDatesArr.push({date: currentDate, dateTitle: this.state.jobOverviewData.jobName, dateType: "booked"})
    })
    let currentAvailability = currentUser.availability ? currentUser.availability.dates : []
    let newAvailability = [...currentAvailability, ...newDatesArr]
    return newAvailability
  }

  acceptJobInvite = (e) => {
    e.preventDefault()
    let index 
    const jobOverviewLink = "/job-overview/" + this.state.jobOverviewData.jobCreatorID + '/' + this.state.jobOverviewData.jobID
    this.state.jobOverviewData.usersAssigned.map( (user, key) => {
      index = user.id === this.props.currentUser.id ? key : null
    })
    let newUsersAssignedObject = Object.assign({}, this.state.jobOverviewData)
    newUsersAssignedObject.usersAssigned[index].status = "accepted"
    newUsersAssignedObject.usersAssigned[index].jobType = "accepted"
    const userWithAcceptedJob = newUsersAssignedObject.usersAssigned[index]
    let newUserAvailability = this.updateUsersJobDates(this.state.jobOverviewData.jobDates)
    this.setState({
      jobOverviewData: newUsersAssignedObject
    })
    this.props.acceptJobInvitation(this.state.jobOverviewData.jobCreatorID, this.state.jobOverviewData.jobID, this.props.currentUser, this.state.jobOverviewData.usersAssigned, jobOverviewLink, newUserAvailability)
      .then( () => {
        this.props.createUserAcceptedJob(this.props.currentUser.id, this.state.jobOverviewData.jobID, userWithAcceptedJob )
      })
  }

  denyJobInvite = (e) => {
    e.preventDefault()
    const jobOverviewLink = this.state.jobOverviewData.jobCreatorID + '/' + this.state.jobOverviewData.jobID
    const index = this.state.jobOverviewData.usersAssigned.map( (user, key) => {
      if( user.id === this.props.currentUser.id) {
        return key
      }
    })

    const newUsers = this.state.jobOverviewData.usersAssigned.filter( user => user.id.toString() !== this.props.currentUser.id.toString())
    this.setState(prevState => ({
      jobOverviewData: {
        ...prevState.jobOverviewData,
        usersAssigned: newUsers
      }
    }), () => {
      this.props.denyJobInvitation(this.state.jobOverviewData, this.props.currentUser, jobOverviewLink)
      .then( (result) => {
        result === "success" ? this.props.history.push("/dashboard") : console.log("Error")
      })
    })
  }

  deleteCreatedJob = (e) => {
    e.preventDefault()
    this.props.deletedCreatedJob(this.props.currentUser.id, this.state.jobOverviewData.jobID, this.state.jobOverviewData.usersAssigned)
    .then( (result) => {
      console.log(result)
      if( result === 'success') { this.props.history.push("/jobs") }
    })
  }

  editCreatedJob = () => {
    this.props.createReduxJob(this.state.jobOverviewData)
    this.props.history.push(`/jobs/${this.state.jobOverviewData.jobID}/job-information`)
  }

  render() {
    if(this.state.loading) return <h1>Loading</h1>
    if(this.state.pageError) return <h1>Error</h1>
    const { jobOverviewData } = this.state
    const isCurrentUserAssigned = this.testIfCurrentUserIsAssigned(this.props.currentUser.id)
    const hasUserAccepted = this.testIfCurrentUserAccepted(this.props.currentUser.id)
    const isCurrentUserJobCreator = this.testIfCurrentUserIsCreator(this.props.currentUser.id)
    return (
      <div className="card">
        <div className="card-header">
        <h3>Job Overview: {jobOverviewData.jobName}</h3>
        <p>This is the job overview page for the selected job. Anyone can view this job, the job creator can edit or delete.</p>  
        </div>
        <div className="card-body">
        <div className="job-item">
          <h4>Job Creator:</h4>
          <p>{jobOverviewData.jobCreator}</p>
        </div>
        <div className="job-item">
          <h4>Job Location:</h4>
          <p>{jobOverviewData.jobLocation.value}</p>
        </div>
        <div className="job-item">
          <h4>Job Dates:</h4>
          { jobOverviewData.dateSelectorRangeActive 
            ?
              <p>{jobOverviewData.jobDates[0]} - {jobOverviewData.jobDates[1]}</p>
            :
              jobOverviewData.jobDates.map( (date, key) => { return <p key={key}>{date}</p>})
          }
        </div>
        <div className="job-item">
          <h4>Job Description:</h4>
          <p>{jobOverviewData.jobDesc}</p>
        </div>
        <div className="job-item">
          <h4>Union Required:</h4>
          <p>{jobOverviewData.unionMember ? 'Yes' : 'No'}</p>
        </div>
        <div className="job-item">
          <h4>Positions:</h4>
          {jobOverviewData.jobPositions.map( (position, key) => { return <p key={key}>{position}</p>})}
        </div>
        <div className="job-item">
          <h4>Preferred Contact:</h4>
          <p>{jobOverviewData.jobContact}</p>
        </div>
        <div className="job-item">
          <h4>Assigned Positions:</h4>
          {
            jobOverviewData.usersAssigned.map( (user, key) => {
              return <p key={key}>{user.position}: {user.name} with a status of {user.status}</p>
            })
          }
        </div>
        </div>
        <div className="card-footer">
        {
          isCurrentUserAssigned && !hasUserAccepted &&
          <div className="card-footer-action">
            <button className="button-form" onClick={(e) => this.acceptJobInvite(e)}>Accept</button>
            &nbsp;
            <button className="button-form" onClick={(e) => this.denyJobInvite(e)}>Deny</button>
          </div>
        }
        {
          isCurrentUserAssigned && hasUserAccepted &&
          <div className="card-footer-action">
            <a href={`mailto:${this.state.jobOverviewData.jobContactEmail}`} className="button button-form">Contact Job Creator</a>
          </div>
        }
        {
          isCurrentUserJobCreator && 
          <div className="job-creator-controls">
            <div className="button-wrapper">
            <button className="button-form" onClick={() => this.editCreatedJob()}>Edit Job</button>
            <button className="button-form" onClick={(e) => this.deleteCreatedJob(e)}>Delete Job</button>
            </div>
          </div>
        }
        </div>
      </div>
    )
  }
}

export default JobOverviewTable
