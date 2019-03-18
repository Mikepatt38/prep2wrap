import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import dateFns from "date-fns"
import logo from '../img/calltime-logo.png'
import { Login } from '../components/Auth/Login'
import { SignUp } from '../components/Auth/SignUp'
import { PasswordReset } from '../components/Auth/PasswordReset'

const UserAuth = ({ history, signUserIn, signUpUser, resetPassword, location, currentUser, setUserProfile, active, alertText, setAlert}) => {
  switch(location.pathname) {
    case '/login':
      return (
        <Login 
          signUserIn={signUserIn}
          history={history}
          error={active}
          errorText={alertText}
        />
      )
      break
    
    case '/signup':
      return (
        <SignUp 
          signUpUser={signUpUser}
          history={history} 
          currentUser={currentUser}
          setUserProfile={setUserProfile}
          error={active}
          errorText={alertText}
          resetErrors={setAlert}
        />
      )
      break

    case '/password-reset':
      return (
        <PasswordReset
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
