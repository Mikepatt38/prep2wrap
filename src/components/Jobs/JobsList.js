import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LinkIcon from '../../img/icon-getting-started.svg'

class JobsList extends Component {
  state = {
    userJobs: [],
    loading: true
  }

  componentDidMount = async () => {
    const { getUserJobs, currentUser} = this.props
    const jobData = await getUserJobs(currentUser.id)
    console.log(jobData)
    this.setState({
      userJobs: jobData,
      loading: false
    })
  }

  renderHeaders() {
    return (
      <div className="table-header table-rows-4">
        <div className="table-header-col">Relation</div>
        <div className="table-header-col">Name</div>
        <div className="table-header-col">Location</div>
        <div className="table-header-col">Job Status</div>
        <div className="table-header-col"></div>
      </div>
    )
  }

  renderRows(){
    let rows = []
    let cells = []
    this.state.userJobs.map( (job, key) => {
      cells.push(
        <React.Fragment key={key}>
          <div className="table-row-cell">{job.jobStatus}</div>
          <div className="table-row-cell">{job.jobName}</div>
          <div className="table-row-cell">New York City, New York</div>
          <div className="table-row-cell"><span><span className="status active">Active</span></span></div> 
          <div className="table-row-cell"><span className="table-row-link">View <img src={LinkIcon} alt="Table Link Icon" /></span></div>       
        </React.Fragment>
      )
      rows.push(
        <Link to={`/job-overview/${job.jobCreatorID}/${job.jobID}`}>
          <div className="table-row table-rows-4" key={key}>
            {cells}
          </div>
        </Link>
      )
      cells = []
    })
    return <div className="table-body">{rows}</div>
  }

  render() {
    if(this.state.loading) return <h1>Loading...</h1>
    return (
      <div className="table">
        {this.renderHeaders()}  
        {this.renderRows()}
      </div>
    )
  }
}


export default JobsList
