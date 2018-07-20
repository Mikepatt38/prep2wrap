import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Landing extends Component {

  render() {
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
}

export default Landing
