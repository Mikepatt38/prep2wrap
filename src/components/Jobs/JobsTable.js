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

  componentDidMount = async () => {
    const { getUserJobs, currentUser} = this.props
    const jobData = await getUserJobs(currentUser.id)
    this.setState({
      userJobs: jobData,
      loading: false
    })
  }

  render() {
   
    const columns = [
      {
        id: 'Status', // Required because our accessor is not a string
        Header: 'Status',
        headerClassName: 'cell-small',
        Cell: props => props.original.status === 'Active' ? <span className="cell-status active">Active</span> : props.original.status === 'Completed' ? <span className="cell-status completed">Completed</span> : <span className="cell-status pending">Pending</span>,
        className: 'cell-small'
      },
      {
        Header: 'Position',
        headerClassName: 'cell-medium',
        Cell: props => props.original.jobStatus === 'created' ? <span>Creator</span> : <span>{props.original.position}</span>,
        className: 'cell-medium'
      }, 
      {
        Header: 'Name',
        accessor: 'jobName',
      }, 
      {
        id: 'Location', // Required because our accessor is not a string
        Header: 'Location',
        headerClassName: 'cell-small',
        accessor: 'jobLocation.value',
        className: 'cell-small'
      },
      {
        id: 'Actions', // Required because our accessor is not a string
        Header: 'Action',
        headerClassName: 'cell-small',
        Cell: props => <Link to={`/job-overview/${props.original.jobCreatorID}/${props.original.jobID}`} key={props.original.jobID}><img src={ActionIcon} alt="Table Icon for Actions" /></Link>,
        className: 'cell-small'
      }
    ]
   
    return <ReactTable
      data={this.state.userJobs}
      columns={columns}
      loading={this.state.loading}
      defaultPageSize={10}
      minRows={1}
      // className="-striped -highlight"
    />
  }
}
