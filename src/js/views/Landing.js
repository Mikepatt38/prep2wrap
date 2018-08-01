import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const tempStyle = {
  marginTop: '85px'
}

const Navbar = () => {
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

class Landing extends Component {

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container" style={tempStyle}>
          <h1>Home Page</h1>
        </div>
      </React.Fragment>
    )
  }
}

export default Landing
