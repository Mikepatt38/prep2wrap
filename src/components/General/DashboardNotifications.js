import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CloseIcon from '../../img/icon-close.svg'

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
        {
          this.state.jobNotifications.map( (notification, key) => {
            return (
              <Link to="/jobs" key={key}>
                <div className="notification" key={key}>
                  <div className="notification-text">
                    <p><b>{notification.text}</b> <span>Click to view the job overview.</span></p>
                  </div>
                  <div className="notification-close">
                    <span onClick={(e) => this.handleRemoveNotification(e, notification.id)}><img src={CloseIcon} alt="Close Icon" /></span> 
                  </div>
                </div>
              </Link>
            )
          })
        } 
      </div>
    )
  }
}

export default DashboardNotifications