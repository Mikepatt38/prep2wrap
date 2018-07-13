import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from './SignOut'
import AccountIcon from '../../img/icon-account.svg'
import { setDropdownToggle } from '../../actions/components'
import { connect } from 'react-redux';

class NavDropdown extends Component {
  state = {
    dropdownClass: 'navbar-dropdown'
  }

  toggleDropdown = () => {
    const { onToggleDropdown } = this.props
    onToggleDropdown(!this.props.dropdownOpen)
  }

  render() {
    const { dropdownOpen } = this.props

    return (
      <div className="navbar-tools">
        <a className="toggle-dropdown" role="button" onClick={this.toggleDropdown}>
          <img src={AccountIcon} alt="Account Icon" />
        </a>
        <div className={dropdownOpen ? 'navbar-dropdown open' : 'navbar-dropdown'}>
          <ul className="navbar-dropdown-items">
            <li className="dropdown-arrow"></li>
            <li className="dropdown-items">
              <Link to="/account-settings" onClick={this.toggleDropdown}>
                Account settings
              </Link>
            </li>
            <li className="dropdown-items">
              <a>Billing Information</a>
            </li>
            <li className="dropdown-items" onClick={this.toggleDropdown}>
              <SignOutButton />
            </li>
          </ul>
        </div>
      </div>
    )}
}

const mapStateToProps = (state) => ({
  dropdownOpen: state.sessionState.dropdownOpen
})

const mapDispatchToProps = (dispatch) => ({
  onToggleDropdown: (dropdownOpen) => dispatch(setDropdownToggle(dropdownOpen))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavDropdown)