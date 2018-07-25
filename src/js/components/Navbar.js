import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NavDropdown from './NavDropdown'
import logo from '../../img/logo.svg'

const AuthNav = () => {
  return (
    <div className="navbar">
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
    <span></span>
  )
}

class Navbar extends Component {
  render() {
    const { authUser } = this.props

    return (
      authUser 
        ? <AuthNav />
        : <NonAuthNav />
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
})

export default connect(mapStateToProps)(Navbar)