import React, { Component } from 'react'

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

  render() {
    if(this.state.loading) return <h1>Loading...</h1>
    return (
      <ul>
        {
          this.state.userJobs.map( (job, key) => {
            return <li key={key}>{job.jobType}: {job.jobName}</li>
          })
        }
      </ul>
    )
  }
}


export default JobsList
