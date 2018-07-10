import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from './SignOut'
import AccountIcon from '../../img/icon-account.svg'
import { setDropdownToggle } from '../../actions/index'
import { connect } from 'react-redux';

class NavDropdown extends Component {
  state = {
    dropdownOpen: false,
    dropdownClass: 'navbar-dropdown'
  }

  toggleDropdown = () => {
    const { onToggleDropdown } = this.props
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
    onToggleDropdown(!this.state.dropdownOpen)
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
    )}
}

const mapStateToProps = (state) => ({
  dropdownOpen: state.sessionState.dropdownOpen
})

const mapDispatchToProps = (dispatch) => ({
  onToggleDropdown: (dropdownOpen) => dispatch(setDropdownToggle(dropdownOpen))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavDropdown)