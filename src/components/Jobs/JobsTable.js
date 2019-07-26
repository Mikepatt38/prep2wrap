import ReactTable from "react-table"
import React, { Component } from 'react'
import ActionIcon from '../../img/icon-action.svg'
import 'react-table/react-table.css'
import JobOveriewModal from "./JobsModal"
import JobIllustration from '../../img/illustrations/jobs.svg'
import EmptyState from "../General/EmptyState"
import Loading from "../General/Loading"

export class JobsTable extends Component {
  state = {
    userJobs: [],
    loading: true,
    modalActive: false,
    job: {},
    pageLoading: true
  }

  componentDidMount(){
    this.getUsersCurrentJobs()
    setTimeout(() => {
      this.setState({
        pageLoading: false
    })}, 500)
  }

  toggleModal = () => {
    this.setState({
      modalActive: !this.state.modalActive
    })
  }

  getUsersCurrentJobs = async () => {
    const { getUserJobs, currentUser} = this.props
    const jobData = await getUserJobs(currentUser.id)
    this.setState({
      userJobs: jobData,
      hasJobData: jobData.length > 0,
      loading: false
    })
  }

  getUserType(userID, jobCreatorID, status){
    let userType = 'visitor'
    if(jobCreatorID === userID) {
      userType = 'creator'
    }
    else if(status.toLowerCase() === "review"){
      userType = 'pending'
    }
    else if(status.toLowerCase() === "pending"){
      userType = 'accepted'
    }
    else {
      userType = 'visitor'
    }
    return userType
  }

  toggleRowActions(index){
    // store which row was selected
    const el = document.getElementById(`row-${index}`)
    const elAction = document.getElementById(`action-${index}`)
    // if there are rows that are active, lets find them
    const els = document.getElementsByClassName('row-actions-active')
    const elsAction = document.getElementsByClassName('action-hidden')
    // we need to remove this class if it is out there
    if(els[0] && els[0].id === `row-${index}`){
      els[0].classList.remove('row-actions-active')
      elsAction[0].classList.remove('action-hidden')
    }
    else if(els[0]){
      els[0].classList.remove('row-actions-active')
      elsAction[0].classList.remove('action-hidden')
      el.classList.add('row-actions-active')
      elAction.classList.add('action-hidden')
    }
    //if there aren't any active, lets add the class
    else {
      el.classList.add('row-actions-active')
      elAction.classList.add('action-hidden')
    }
  }

  updateUsersJobDates = (newDates, jobName) => {
    const { currentUser } = this.props
    let newDatesArr = []
    newDates.map(currentDate => {
      newDatesArr.push({date: currentDate, dateTitle: jobName, dateType: "booked"})
    })
    let currentAvailability = currentUser.availability ? currentUser.availability : []
    let newAvailability = [...currentAvailability, ...newDatesArr]
    return newAvailability
  }

  sendSMSAlert = (userNumber, message) => {
    this.props.sendSMSAlerts(userNumber, message)
  }

  sendMultipleSMSAlert = (users, message) => {
    let promises = []
    users.map( user => {
      promises.push(this.props.sendSMSAlerts(user.number, message))
    })
    Promise.all(promises).then( () => true)
  }

  acceptJobInvite = (jobObj) => {
    this.setState({
      loading: true
    })
    const userIndex = jobObj.usersAssigned.findIndex(user => user.id === this.props.currentUser.id)
    const newUserObj = {
      ...jobObj.usersAssigned[userIndex],
      status: 'Pending'
    }
    const position = jobObj.usersAssigned[userIndex].position
    const SMSAlertMsg = `${this.props.currentUser.firstName} ${this.props.currentUser.lastName} accepted your crew invite as ${position}!`
    let newUserAvailability = this.updateUsersJobDates(jobObj.jobDates, jobObj.jobName)
    this.props.acceptJobInvitation(jobObj.jobCreatorID, jobObj.jobID, this.props.currentUser, newUserAvailability, position)
      .then( () => {
        this.props.createUserAcceptedJob(this.props.currentUser.id, jobObj.jobID, newUserObj)
        .then( () => {
          this.sendSMSAlert(jobObj.jobCreatorNumber, SMSAlertMsg)
          this.getUsersCurrentJobs()
        })
      })
  }

  denyJobInvite = (jobObj) => {
    this.setState({
      loading: true
    })
    const userIndex = jobObj.usersAssigned.findIndex(user => user.id === this.props.currentUser.id)
    const position = jobObj.usersAssigned[userIndex].position
    const newAssignedUsers = jobObj.usersAssigned.filter( user => user.id.toString() !== this.props.currentUser.id.toString())
    const SMSAlertMsg = `${this.props.currentUser.firstName} ${this.props.currentUser.lastName} denied your crew invite as ${position}!`
    this.props.denyJobInvitation(this.props.currentUser, jobObj.jobCreatorID, jobObj.jobID, newAssignedUsers, position)
    .then( () => {
      this.sendSMSAlert(jobObj.jobCreatorNumber, SMSAlertMsg)
      this.getUsersCurrentJobs()
    })
  }

  deleteCreatedJob = (jobObj) => {
    this.setState({
      loading: true
    })
    const SMSAlertMsg = `${jobObj.jobCreator} has deleted the job ${jobObj.jobName}.`
    this.props.deletedCreatedJob(this.props.currentUser, jobObj.jobID, jobObj.jobName, jobObj.jobDates, jobObj.usersAssigned)
    .then( () => {
      this.sendMultipleSMSAlert(jobObj.usersAssigned, SMSAlertMsg)
      this.getUsersCurrentJobs()
    })
  }

  completeCreatedJob = (jobObj) => {
    this.setState({
      loading: true
    })
    const SMSAlertMsg = `${jobObj.jobCreator} has marked the job ${jobObj.jobName} as completed.`
    this.props.completeUserJob(this.props.currentUser, jobObj)
    .then( () => {
      this.sendMultipleSMSAlert(jobObj.usersAssigned, SMSAlertMsg)
      this.getUsersCurrentJobs()
    })
  }

  handleViewJob = (job) => {
    this.setState({
      job: job,
      modalActive: true
    })
  }

  render() {

    if(this.state.pageLoading){
      return (
        <Loading />
      )
    }
   
    const columns = [
      {
        id: 'Status', // Required because our accessor is not a string
        Header: 'Status',
        headerClassName: 'cell-small',
        filterable: false,
        sortable: false,
        Cell: props => <span className={`cell-status ${props.original.status.toLowerCase()}`}>{props.original.status}</span>,
        className: 'cell-small'
      },
      {
        Header: 'Position',
        headerClassName: 'cell-medium',
        filterable: false,
        sortable: false,
        Cell: props => props.original.jobStatus === 'created' ? <span>Creator</span> : props.original.jobStatus === 'invited' ? <span>Invited</span> : <span>{props.original.position}</span>,
        className: 'cell-medium'
      }, 
      {
        Header: 'Name',
        accessor: 'jobName',
        filterable: false,
        sortable: false
      }, 
      {
        id: 'Location', // Required because our accessor is not a string
        Header: 'Location',
        headerClassName: 'cell-small',
        accessor: 'jobLocation.value',
        className: 'cell-small',
        filterable: false,
        sortable: false
      },
      {
        id: 'Actions', // Required because our accessor is not a string
        Header: 'Action',
        headerClassName: 'cell-action',
        filterable: false,
        sortable: false,
        className: 'cell-small cell-action',
        // Cell: props => <Link to={`/job-overview/${props.original.jobCreatorID}/${props.original.jobID}`} key={props.original.jobID}><img src={ActionIcon} alt="Table Icon for Actions" /></Link>,
        Cell: props => {
          const userType = this.getUserType(this.props.currentUser.id, props.original.jobCreatorID, props.original.status)
          return (     
            <div className="action-container">
              <div 
                className="action" 
                onClick={() => this.toggleRowActions(props.index)} 
                id={`action-${props.index}`}
              >
                  <img src={ActionIcon} alt="Table Icon for Actions" />
              </div>
              <ul className="table-action-list" id={`row-${props.index}`}>
                {
                  userType === 'pending' && props.original.status.toLowerCase() === 'review' &&
                  <React.Fragment>
                    <li className="table-action-list-item" onClick={() => this.handleViewJob(props.original)}>View</li>
                    <li className="table-action-list-item" onClick={() => this.acceptJobInvite(props.original)}>Accept</li>
                    <li className="table-action-list-item" onClick={() => this.denyJobInvite(props.original)}>Deny</li>
                  </React.Fragment>
                }
                {
                  userType === 'accepted' && props.original.status.toLowerCase() === 'pending' &&
                  <React.Fragment>
                    <li className="table-action-list-item" onClick={() => this.handleViewJob(props.original)}>View</li>
                    <li><a href={`mailto:${props.original.jobContactEmail}`}>Contact Creator</a></li>
                  </React.Fragment>
                }
                {
                  userType === 'visitor' && 
                  <React.Fragment>
                    <li className="table-action-list-item" onClick={() => this.handleViewJob(props.original)}>View</li>
                    <li><a href={`mailto:${props.original.jobContactEmail}`}>Contact Creator</a></li>
                  </React.Fragment>
                }
                {
                  userType === 'creator' && props.original.status.toLowerCase() !== 'completed' &&
                  <React.Fragment>
                    <li className="table-action-list-item" onClick={() => this.handleViewJob(props.original)}>View</li>
                    <li className="table-action-list-item" onClick={() => this.completeCreatedJob(props.original)}>Complete</li>
                    <li className="table-action-list-item" onClick={() => this.deleteCreatedJob(props.original)}>Delete</li>
                  </React.Fragment>
                }
                {
                  userType === 'creator' && props.original.status.toLowerCase() === 'completed' &&
                  <React.Fragment>
                    <li className="table-action-list-item" onClick={() => this.handleViewJob(props.original)}>View</li>
                  </React.Fragment>
                }
              </ul>
            </div>
          )
        },
      }
    ]
   
    return (
      <React.Fragment>
        <JobOveriewModal 
          active={this.state.modalActive}
          job={this.state.job}
          close={this.toggleModal}
        />
        {
          this.state.hasJobData 
          ?
          <React.Fragment>
          <p>Your latest collection of created, completed, and pending jobs on the app.</p>
          <ReactTable
            data={this.state.userJobs}
            columns={columns}
            loading={this.state.loading}
            defaultPageSize={10}
            minRows={1}
            resizable={false}
          /> 
          </ React.Fragment>
          :
          <EmptyState
            imgSrc={JobIllustration}
            imgAlt="Job Page Illustration"
            title="You currently do not have any job data."
            text="This is where all your job data will appear. You will be able to view, accept, deny, or complete any jobs that you are apart of."
          />
        }
      </React.Fragment>
    )
  }
}
