import React from 'react'
import { withRouter } from 'react-router-dom'
import { Login } from '../components/Auth/Login'
import SignUp from '../components/Auth/SignUp'
import { PasswordReset } from '../components/Auth/PasswordReset'

const UserAuth = ({ history, signUserIn, signUpUser, resetPassword, location, currentUser, setUserProfile, active, alertType, alertText, setAlert}) => {
  switch(location.pathname) {
    case '/login':
      return (
        <Login 
          signUserIn={signUserIn}
          history={history}
          error={active}
          errorType={alertType}
          errorText={alertText}
          resetErrors={setAlert}
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
