import React, { Component } from 'react'
import { connect } from 'react-redux'
import AccountIcon from '../../img/icon-account.svg'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <div className={this.props.authUser ? 'sidebar' : 'sidebar closed'}>
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item">
            <Link to="/dashboard">
              <img src={AccountIcon} alt="Home Icon" />
              Home
            </Link>
          </li>
          <li className="sidebar-nav-item">
            <a>
              <img src={AccountIcon} alt="Jobs Icon" />
              Jobs
            </a>
          </li>
          <li className="sidebar-nav-item">
            <a>
              <img src={AccountIcon} alt="Users Icon" />
              Users
            </a>
          </li>
          <li className="sidebar-nav-item">
            <a>
              <img src={AccountIcon} alt="Availability Icon" />
              Availability
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
})

export default connect(mapStateToProps)(Sidebar)
