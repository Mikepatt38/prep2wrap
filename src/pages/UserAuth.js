import React, { Component } from 'react'
import logo from '../img/calltime-logo.png'
import { withRouter } from 'react-router-dom'
import { Login } from '../components/Login'
import { SignUp } from '../components/SignUp'
import { PasswordReset } from '../components/PasswordReset'

const UserAuth = ({ history, signUserIn, signUpUser, resetPassword, location }) => {
  switch(location.pathname) {
    case '/login':
      return (
        <Login 
          logo={logo}
          signUserIn={signUserIn}
          history={history}
        />
      )
      break
    
    case '/signup':
      return (
        <SignUp 
          logo={logo} 
          signUpUser={signUpUser}
          history={history} 
        />
      )
      break

    case '/password-reset':
      return (
        <PasswordReset
          logo={logo}
          resetPassword={resetPassword}
          history={history}
        />
      )
      break

    default:
      history.push("/login")
  }
}

export default withRouter(UserAuth)
