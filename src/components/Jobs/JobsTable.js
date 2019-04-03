import ReactTable from "react-table"
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
   
    const columns = [{
      Header: 'Type',
      accessor: 'jobStatus' // String-based value accessors!
    }, 
    {
      Header: 'Name',
      accessor: 'jobName',
    }, 
    {
      id: 'Location', // Required because our accessor is not a string
      Header: 'Location',
      accessor: 'jobLocation.value'
    },
    {
      id: 'Status', // Required because our accessor is not a string
      Header: 'Status',
      Cell: props => props.original.status === 'Active' ? <span>Active</span> : <span>Pending</span>
    },
    {
      id: 'Actions', // Required because our accessor is not a string
      Header: 'Status',
      Cell: props => <Link to={`/job-overview/${props.original.jobCreatorID}/${props.original.jobID}`} key={props.original.jobID}>View</Link>
    }, 
    // {
    //   Header: props => <span>Friend Age</span>, // Custom header components!
    //   accessor: 'friend.age'
    // },
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
