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

  handleRemoveNotification = (e, currentNotificationID) => {
    e.preventDefault()
    let tempArr = this.state.jobNotifications
    const newState = tempArr.filter( notification => notification.id !== currentNotificationID)
    this.setState({
      jobNotifications: newState
    })
    this.props.removeUserJobNotification(this.props.currentUser.id, currentNotificationID)
  }

  render() {
    if(this.state.loadingNotifications) return <p>Loading...</p>
    return (
      <div className="dashboard-notifications">
        <h4>Notifications</h4>
        <ul>
          {
            this.state.jobNotifications.map( (notification, key) => {
              return <li key={key}>
                  {notification.text} 
                  <a href={notification.link}>View Job</a>
                  <span onClick={(e) => this.handleRemoveNotification(e, notification.id)}>Clear</span> 
                </li>
            })
          } 
        </ul>
      </div>
    )
  }
}

export default DashboardNotifications