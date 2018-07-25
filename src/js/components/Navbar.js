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
    <div className="navbar navbar--fullWidth">
      <div className="navbar-logo">
        <Link to="/">
          {/* <img src={logo} alt="The Calltime Logo" /> */}
          The Calltime
        </Link>
      </div>

      <div className="navbar-nav">
        <nav>
          <ul>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
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