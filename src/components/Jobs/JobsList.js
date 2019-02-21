import React, { Component } from 'react'

class JobsList extends Component {
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
    if(this.state.loading) return <h1>Loading...</h1>
    return (
      <p>JObs List</p>
    )
  }
}


export default JobsList
