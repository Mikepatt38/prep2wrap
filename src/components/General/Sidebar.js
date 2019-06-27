import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from '../../containers/SignOut'
import DashboardIcon from '../../img/icon-dashboard.svg'
import JobsIcon from '../../img/icon-jobs.svg'
import UsersIcon from '../../img/icon-users.svg'
import AvailabilityIcon from '../../img/icon-availability.svg'
import AccountIcon from '../../img/icon-settings.svg'
import LogoutIcon from '../../img/icon-logout.svg'

function Sidebar(){
  return (
    <nav>
      <Link to="/" className="nav-link"><img src={DashboardIcon} alt="Dashboard Icon" /> Dashboard</Link>
      <Link to="/jobs" className="nav-link"><img src={JobsIcon} alt="Jobs Icon" /> Jobs</Link>
      <Link to="/users" className="nav-link"><img src={UsersIcon} alt="Users Icon" /> Users</Link>
      <Link to="/availability" className="nav-link"><img src={AvailabilityIcon} alt="Availability Icon" /> Availability</Link>
      <Link to="/account-settings" className="nav-link"><img src={AccountIcon} alt="Account Settings Icon" /> Account Settings</Link>
      <Link to="/account-settings" className="nav-link"><img src={LogoutIcon} alt="Logout Icon" /><SignOutButton /></Link>
    </nav>
  )
}

// function Sidebar(){
//   return (
//     <div className="sidebar">
//       <div className="sidebar-section">
//         <div>
//           <h5><img src={DashboardIcon} /><Link to="/">Dashboard</Link></h5>
//         </div>
//       </div>
//       <div className="sidebar-section">
//         <div>
//           <h5><img src={JobsIcon} /><Link to="/jobs">Jobs</Link></h5>
//         </div>
//       </div>
//       <div className="sidebar-section">
//         <div>
//           <h5><img src={UsersIcon} /><Link to="/users">Crew</Link></h5>
//         </div>
//       </div>
//       <div className="sidebar-section">
//         <div>
//           <h5><img src={AvailabilityIcon} /><Link to="/availability">Availability</Link></h5>
//         </div>
//       </div>
//       <div className="sidebar-section">
//         <div>
//           <h5><img src={UsersIcon} /><Link to="/account-settings">Account</Link></h5>
//         </div>
//       </div>
//       <div className="sidebar-section sidebar-section--bottom">
//         <div>
//           <h5><img src={LogoutIcon} /><SignOutButton /></h5>
//         </div>
//       </div>
//     </div> 
//   )
// }

export default Sidebar
