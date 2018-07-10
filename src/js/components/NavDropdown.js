import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from './SignOut'
import AccountIcon from '../../img/icon-account.svg'

class NavDropdown extends Component {
  state = {
    dropdownOpen: false,
    dropdownClass: 'navbar-dropdown'
  }

  toggleDropdown = () => {
    this.setState ({
      dropdownOpen: !this.state.dropdownOpen,
      dropdownClass: this.state.dropdownOpen ? 'navbar-dropdown' : 'navbar-dropdown open'
    })
  }

  render() {
    const { dropdownClass } = this.state

    return (
      <div className="navbar-tools">
        <a className="toggle-dropdown" role="button" onClick={this.toggleDropdown}>
          <img src={AccountIcon} alt="Account Icon" />
        </a>
        <div className={dropdownClass}>
          <ul className="navbar-dropdown-items">
            <li className="dropdown-arrow"></li>
            <li className="dropdown-items">
              <Link to="/account-settings">
                Account settings
              </Link>
            </li>
            <li className="dropdown-items">
              <a>Billing Information</a>
            </li>
            <li className="dropdown-items">
              <SignOutButton />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default NavDropdown