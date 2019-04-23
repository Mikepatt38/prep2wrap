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
    console.log('component is mounting...')
    this.getUsersCurrentJobs()
  }

  // componentDidUpdate(){
  //   console.log('component is updating...')
  //   this.getUsersCurrentJobs()
  // }

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

  deleteCreatedJob = (jobObj) => {
    this.props.deletedCreatedJob(this.props.currentUser, jobObj.jobID, jobObj.jobName, jobObj.jobDates, jobObj.usersAssigned)
    .then( () => {
      this.getUsersCurrentJobs()
    })
  }

  moveJobToCompleted = (currentUser, jobObj) => {
    this.props.completeUserJob(currentUser, jobObj)
    .then( () => {
      this.getUsersCurrentJobs()
    })
  }

  // Have the table update on change\
  // ✅ Change users who accepted jobs to completed when the job creator does
  // Accept/ Deny Ability from the Jobs Table
  // Form validation for the job creation process
  // Redirect to jobs page not overview page
  // Clean Up Job Overview Link Code 
  // Fix URL changing when sending SMS Text Notifications 
  // Stripe Integration into the Signup form
  // Have a way to filter the different dates by booked/ etc
  // ✅ Should calendar say if a job has been completed or not?

  render() {
   
    const columns = [
      {
        id: 'Status', // Required because our accessor is not a string
        Header: 'Status',
        headerClassName: 'cell-small',
        filterable: false,
        sortable: false,
        Cell: props => props.original.status === 'Active' ? <span className="cell-status active">Active</span> : props.original.status.toLowerCase() === 'completed' ? <span className="cell-status completed">Completed</span> : <span className="cell-status pending">Pending</span>,
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
                  userType === 'creator' && props.original.status !== 'completed' &&
                  <React.Fragment>
                    <li className="table-action-list-item" onClick={() => this.props.setJobsModal(true, props.original)}>View</li>
                    <li className="table-action-list-item" onClick={() => this.props.completeUserJob(this.props.currentUser, props.original)}>Complete</li>
                    <li className="table-action-list-item" onClick={() => this.deleteCreatedJob(props.original)}>Delete</li>
                  </React.Fragment>
                }
                {
                  userType === 'creator' && props.original.status === 'completed' &&
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
