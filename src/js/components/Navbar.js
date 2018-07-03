import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from './SignOut'

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
      { authUser ? <AuthNav /> : <NonAuthNav /> }
      {console.log(authUser)}
    </section>  
  )
}

export default Navbar