import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from './SignOut';

class Navbar extends Component {
  render() {
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
        <li>
          <SignOutButton />
        </li>
      </ul>
    )
  }
}

export default Navbar