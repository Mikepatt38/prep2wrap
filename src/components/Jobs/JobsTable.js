import ReactTable from "react-table"
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ActionIcon from '../../img/icon-action.svg'
import 'react-table/react-table.css'

export class JobsTable extends Component {
  state = {
    userJobs: [],
    loading: true
  }

  componentDidMount(){
    this.getUsersCurrentJobs()
  }

  getUsersCurrentJobs = async () => {
    const { getUserJobs, currentUser} = this.props
    const jobData = await getUserJobs(currentUser.id)
    this.setState({
      userJobs: jobData,
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
    // else if(status.toLowerCase() === "completed"){
    //   userType = 'visitor'
    // }
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
    let newUserAvailability = this.updateUsersJobDates(jobObj.jobDates, jobObj.jobName)
    this.props.acceptJobInvitation(jobObj.jobCreatorID, jobObj.jobID, this.props.currentUser, newUserAvailability, position)
      .then( () => {
        this.props.createUserAcceptedJob(this.props.currentUser.id, jobObj.jobID, newUserObj)
        .then( () => {
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
    this.props.denyJobInvitation(this.props.currentUser, jobObj.jobCreatorID, jobObj.jobID, newAssignedUsers, position)
    .then( () => {
      this.getUsersCurrentJobs()
    })
  }

  deleteCreatedJob = (jobObj) => {
    this.setState({
      loading: true
    })
    this.props.deletedCreatedJob(this.props.currentUser, jobObj.jobID, jobObj.jobName, jobObj.jobDates, jobObj.usersAssigned)
    .then( () => {
      this.getUsersCurrentJobs()
    })
  }

  completeCreatedJob = (jobObj) => {
    this.setState({
      loading: true
    })
    this.props.completeUserJob(this.props.currentUser, jobObj)
    .then( () => {
      this.getUsersCurrentJobs()
    })
  }

  render() {
   
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
                    <li className="table-action-list-item" onClick={() => this.acceptJobInvite(props.original)}>Accept</li>
                    <li className="table-action-list-item" onClick={() => this.denyJobInvite(props.original)}>Deny</li>
                  </React.Fragment>
                }
                {
                  userType === 'accepted' || userType === 'visitor' &&
                  <React.Fragment>
                    <li className="table-action-list-item" onClick={() => this.props.setJobsModal(true, props.original)}>View</li>
                    <li><a href={`mailto:${props.original.jobContactEmail}`}>Contact Creator</a></li>
                  </React.Fragment>
                }
                {
                  userType === 'creator' && props.original.status.toLowerCase() !== 'completed' &&
                  <React.Fragment>
                    <li className="table-action-list-item" onClick={() => this.props.setJobsModal(true, props.original)}>View</li>
                    <li className="table-action-list-item" onClick={() => this.completeCreatedJob(props.original)}>Complete</li>
                    <li className="table-action-list-item" onClick={() => this.deleteCreatedJob(props.original)}>Delete</li>
                  </React.Fragment>
                }
                {
                  userType === 'creator' && props.original.status.toLowerCase() === 'completed' &&
                  <React.Fragment>
                    <li className="table-action-list-item" onClick={() => this.props.setJobsModal(true, props.original)}>View</li>
                  </React.Fragment>
                }
              </ul>
            </div>
          )
        },
      }
    ]
   
    return <ReactTable
      data={this.state.userJobs}
      columns={columns}
      loading={this.state.loading}
      defaultPageSize={10}
      minRows={1}
      resizable={false}
      // className="-striped -highlight"
    />
  }
}
