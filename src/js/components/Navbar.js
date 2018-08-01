import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NavDropdown from './NavDropdown'
import logo from '../../img/logo.svg'

const AuthNav = () => {
  return (
    <div className="navbar logged-in">
      <div className="navbar-nav">
        <nav>
          <ul>
            <li>
              <NavDropdown />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

const NonAuthNav = () => {
  return (
    <React.Fragment></React.Fragment>
  )
}

class Navbar extends Component {
  render() {
    const { currentUser } = this.props

    return (
      currentUser === null 
        ? <NonAuthNav />
        : <AuthNav />
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.userState.currentUser,
})

export default connect(mapStateToProps)(Navbar)