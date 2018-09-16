import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import SignOutButton from '../containers/SignOut'
import AccountIcon from '../img/icon-account.svg'

const Navbar = ({ currentUser, dropdownOpen, onToggleDropdown }) => {
  return (
    currentUser === null 
      ? 
      <React.Fragment></React.Fragment>
      :
      <div className="navbar logged-in">
        <div className="navbar-nav">
          <nav>
            <ul>

            </ul>
          </nav>
        </div>
      </div>
  )
}

export class NavDropdown extends Component {
  state = {
    dropdownClass: 'navbar-dropdown'
  }

  render() {
    const { dropdownOpen, onToggleDropdown } = this.props

    return (
      <div className="navbar-tools">
        <a className="toggle-dropdown" role="button" onClick={() => onToggleDropdown(!dropdownOpen)}>
          <img src={AccountIcon} alt="Account Icon" />
        </a>
        <div className={dropdownOpen ? 'navbar-dropdown open' : 'navbar-dropdown'}>
          <ul className="navbar-dropdown-items">
            <li className="dropdown-arrow"></li>
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
      </div>
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

export default Navbar