import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from '../../containers/SignOut'
import DashboardIcon from '../../img/icon-dashboard.svg'
import JobsIcon from '../../img/icon-jobs.svg'
import UsersIcon from '../../img/icon-users.svg'
import AvailabilityIcon from '../../img/icon-availability.svg'
import AccountIcon from '../../img/icon-settings.svg'
import LogoutIcon from '../../img/icon-logout.svg'

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="logo-wrapper">
          <a href="/"></a>
        </div>
        <div className="sidebar-section">
          <div>
            <h5><img src={DashboardIcon} /><Link to="/">Dashboard</Link></h5>
          </div>
        </div>
        <div className="sidebar-section">
          <div>
            <h5><img src={JobsIcon} /><Link to="/jobs">Jobs</Link></h5>
          </div>
        </div>
        <div className="sidebar-section">
          <div>
            <h5><img src={UsersIcon} /><Link to="/users">Crew</Link></h5>
          </div>
        </div>
        <div className="sidebar-section">
          <div>
            <h5><img src={AvailabilityIcon} /><Link to="/availability">Availability</Link></h5>
          </div>
        </div>
        <div className="sidebar-section">
          <div>
            <h5><img src={UsersIcon} /><Link to="/account-settings">Account</Link></h5>
          </div>
        </div>
        <div className="sidebar-section sidebar-section--bottom">
          <div>
            <h5><img src={LogoutIcon} /><SignOutButton /></h5>
          </div>
        </div>
      </div> 
    )
  }
}

export default Sidebar
