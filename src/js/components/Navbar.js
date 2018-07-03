import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from './SignOut'
import AuthUserContext from './AuthUserContext'

const AuthNav = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>  
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li> 
      <li>
        <SignOutButton />
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

const Navbar = ({ authUser }) => {
  return (
    <section>
      <AuthUserContext.Consumer>
        { authUser => authUser
          ? <AuthNav />
          : <NonAuthNav />
        }
      </AuthUserContext.Consumer>
    </section>  
  )
}

export default Navbar