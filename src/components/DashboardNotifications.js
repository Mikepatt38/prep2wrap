import React, { Component } from 'react'

class DashboardNotifications extends Component {
  state = {
    loadingNotifications: true,
    jobNotifications: []
  }

  componentDidMount = () => {
    this.props.getUserJobNotifications(this.props.currentUser.id)
      .then( (results) => {
        this.setState({
          loadingNotifications: false,
          jobNotifications: results
        })
      })
  }

  render() {
    if(this.state.loadingNotifications) return <p>Loading...</p>
    return (
      <div className="dashboard-notifications">
        <h4>Notifications</h4>
        <ul>
          {
            this.state.jobNotifications.map( (notification, key) => {
              return <li key={key}>{notification.text} <a href={notification.link}>View Job</a> </li>
            })
          } 
        </ul>
      </div>
    )
  }
}

export default DashboardNotifications