import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NavDropdown from './NavDropdown'
import logo from '../../img/logo.svg'

const AuthNav = () => {
  return (
    <ul>
      <li>
        <NavDropdown />
      </li>
    </ul>
  )
}

const NonAuthNav = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li> 
      <li>
        <Link to="/login">Log In</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>     
    </ul>
  )
}

class Navbar extends Component {
  render() {
    const { authUser } = this.props

    return (
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            {/* <img src={logo} alt="The Calltime Logo" /> */}
            The Calltime
          </Link>
        </div>

        <div className="navbar-nav">
          <nav>
            { authUser 
              ? <AuthNav />
              : <NonAuthNav />
            }
          </nav>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
})

export default connect(mapStateToProps)(Navbar)