import React, { Component } from 'react'
import { connect } from 'react-redux'
import AccountIcon from '../../img/icon-account.svg'
import { Link } from 'react-router-dom'

const tempStyle = {
  paddingTop: '50px'
}

class Sidebar extends Component {
  render() {
    return (
      <div className="app-container-sidebar">
        <div className="sidebar">
          <div className="sidebar-section" style={tempStyle}>
            <div>
              <h5><Link to="/dashboard">Dashboard</Link></h5>
            </div>
          </div>
          <div className="sidebar-section">
            <div>
              <h5><Link to="/dashboard">Jobs</Link></h5>
            </div>
          </div>
          <div className="sidebar-section">
            <div>
              <h5><Link to="/users">Users</Link></h5>
            </div>
          </div>
          <div className="sidebar-section">
            <div>
              <h5><Link to="/dashboard">Availability</Link></h5>
            </div>
          </div>
          <div className="sidebar-section">
            <div>
              <h5><Link to="/account-settings">Account</Link></h5>
            </div>
          </div>
        </div>    
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
})

export default connect(mapStateToProps)(Sidebar)
