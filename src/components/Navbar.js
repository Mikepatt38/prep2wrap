import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from '../img/calltime-logo.png'
import SignOutButton from '../containers/SignOut'
import DashboardIcon from '../img/icon-dashboard.svg'
import JobsIcon from '../img/icon-jobs.svg'
import UsersIcon from '../img/icon-users.svg'
import AvailabilityIcon from '../img/icon-availability.svg'
import AccountIcon from '../img/icon-settings.svg'
import InfoIcon from '../img/icon-info.svg'
import LogoutIcon from '../img/icon-logout.svg'

const Navbar = ({ currentUser, dropdownOpen, onToggleDropdown }) => {
  return (
    currentUser === null 
      ? 
      <React.Fragment></React.Fragment>
      :
      <div className="navbar logged-in">
        <div className="navbar-nav">
          <nav>
          </nav>
        </div>
      </div>
  )
}

export default class DashboardNavbar extends Component {
  render() {
    return (
      <div className="header" id="dashboard">
        <div className="header-section">
          <div className="grid-item">
            <a className="logo"><img src={logo} alt="Calltime Dashboard Logo" /></a>
            <div className="user">
              <p className="name">Michael Patterson</p>
              <p className="description">Costumer - Arlington, Texas</p>
            </div>
          </div>
        </div>
  
        <div className="header-section">
          <div className="grid-item grid-item--centered">
            <ul className="nav">
              <li>
                <span><img src={DashboardIcon} /><Link to="/dashboard">Dashboard</Link></span>
              </li>
              <li>
                <span><img src={JobsIcon} /><Link to="/jobs">Jobs</Link></span>
              </li>
              <li>
                <span><img src={UsersIcon} /><Link to="/users">Users</Link></span>
              </li>
              <li>
                <span><img src={AvailabilityIcon} /><Link to="/availability">Calendar</Link></span>
              </li>
            </ul>
          </div>
        </div>
  
        <div className="header-section">
          <div className="grid-item grid-item--right">
            <ul className="nav nav--icons navbar-tools">
              <li className="padding">
                <span><img className="iconLg" src={InfoIcon} /></span>
              </li>
              <NavDropdown onToggleDropdown={this.props.onToggleDropdown} dropdownOpen={this.props.dropdownOpen} />
            </ul>
          </div>  
        </div>
      </div>
    )
  }
}

export class NavDropdown extends Component {
  state = {
    dropdownClass: 'navbar-dropdown'
  }

  render() {
    const { dropdownOpen, onToggleDropdown } = this.props

    return (
      <span className="navbar-dropdown-relative">
        <li className="padding">
          <a role="button" onClick={() => onToggleDropdown(!dropdownOpen)}><img className="iconLg" src={AccountIcon} alt="Account Icon" /></a>
        </li>
        <div className={dropdownOpen ? 'navbar-dropdown open' : 'navbar-dropdown'}>
          <ul className="navbar-dropdown-items">
            <li className="dropdown-items" onClick={() => onToggleDropdown(!dropdownOpen)}>
              <Link to="/account-settings">
                Account settings
              </Link>
            </li>
            <li className="dropdown-items">
              <a>Billing Information</a>
            </li>
            <li className="dropdown-items" onClick={() => onToggleDropdown(!dropdownOpen)}>
              <SignOutButton />
            </li>
          </ul>
        </div>
      </span>
    )
  }
}

Navbar.propTypes = {
  currentUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  dropdownOpen: PropTypes.bool.isRequired,
  onToggleDropdown: PropTypes.func.isRequired
}
