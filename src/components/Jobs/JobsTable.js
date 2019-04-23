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
    else {
      userType = (status === "pending") ? 'assigned' : 'accepted'
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

  deleteCreatedJob = (e, jobID, jobName, jobDates, usersAssigned) => {
    e.preventDefault()
    this.props.deletedCreatedJob(this.props.currentUser, jobID, jobName, jobDates, usersAssigned)
    .then( (result) => {
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
        Cell: props => props.original.status === 'Active' ? <span className="cell-status active">Active</span> : props.original.status === 'Completed' ? <span className="cell-status completed">Completed</span> : <span className="cell-status pending">Pending</span>,
        className: 'cell-small'
      },
      {
        Header: 'Position',
        headerClassName: 'cell-medium',
        filterable: false,
        sortable: false,
        Cell: props => props.original.jobStatus === 'created' ? <span>Creator</span> : <span>{props.original.position}</span>,
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
                onClick={() => this.toggleRowActions(props.index)} id={`action-${props.index}`}
              >
                  <img src={ActionIcon} alt="Table Icon for Actions" />
              </div>
              <ul className="table-action-list" id={`row-${props.index}`}>
                {
                  userType === 'assigned' &&
                  <React.Fragment>
                    <li><Link to="/">Accept</Link></li>
                    <li><Link to="/">Deny</Link></li>
                  </React.Fragment>
                }
                {
                  userType === 'accepted' &&
                  <React.Fragment>
                    <li className="table-action-list-item" onClick={() => this.props.setJobsModal(true, props.original)}>View</li>
                    <li><a href={`mailto:${props.original.jobContactEmail}`}>Contact Creator</a></li>
                  </React.Fragment>
                }
                {
                  userType === 'creator' &&
                  <React.Fragment>
                    <li className="table-action-list-item" onClick={() => this.props.setJobsModal(true, props.original)}>View</li>
                    <li><Link to="/">Complete</Link></li>
                    <li className="table-action-list-item" onClick={(e) => this.deleteCreatedJob(e, props.original.jobID, props.original.jobName, props.original.jobDates, props.original.usersAssigned)}>Delete</li>
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
