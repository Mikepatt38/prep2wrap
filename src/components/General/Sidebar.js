import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '../../img/icon-dashboard.svg'
import JobsIcon from '../../img/icon-jobs.svg'
import UsersIcon from '../../img/icon-users.svg'
import AvailabilityIcon from '../../img/icon-availability.svg'
import AccountIcon from '../../img/icon-settings.svg'

function Sidebar(){
  return (
    <nav>
      <Link to="/" className="nav-link"><img src={DashboardIcon} alt="Dashboard Icon" /> Dashboard</Link>
      <Link to="/jobs" className="nav-link"><img src={JobsIcon} alt="Jobs Icon" /> Jobs</Link>
      <Link to="/crew" className="nav-link"><img src={UsersIcon} alt="Users Icon" /> Crew</Link>
      <Link to="/availability" className="nav-link"><img src={AvailabilityIcon} alt="Availability Icon" /> Availability</Link>
      <Link to="/account-settings" className="nav-link"><img src={AccountIcon} alt="Account Settings Icon" /> Account Settings</Link>
    </nav>
  )
}

export default Sidebar
