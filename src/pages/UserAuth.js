import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import dateFns from "date-fns"
import logo from '../img/calltime-logo.png'
import { Login } from '../components/Auth/Login'
import { SignUp } from '../components/Auth/SignUp'
import { PasswordReset } from '../components/Auth/PasswordReset'

const AuthNav = ({ currentUser }) => (
  <div className="header auth" id="dashboard">
    <div className="header-section">
      <div className="grid-item">
        <a className="logo"><img src={logo} alt="Calltime Dashboard Logo" /></a>
      </div>
    </div>
    <div className="header-section"></div>
    <div className="header-section">
      <div className="grid-item grid-item--right">
        <ul className="nav nav--dark">
          {
            currentUser === null 
            ?
            <React.Fragment>
              <li>
                <span><Link to="/login">Login</Link></span>
              </li>
              <li>
                <span><Link to="/signup">SignUp</Link></span>
              </li>
            </React.Fragment>
            :
            <React.Fragment>
              <li>
                <span><Link to="/login">Support</Link></span>
              </li>
            </React.Fragment>
          }
        </ul>
      </div>
    </div>
  </div>
)

const AuthFooter = () => (
  <footer className="footer--grey">
    <p>Copyright The Calltime &copy; {dateFns.format(new Date(), "YYYY")}</p>
  </footer>
)

const UserAuth = ({ history, signUserIn, signUpUser, resetPassword, location, currentUser, setUserProfile }) => {
  switch(location.pathname) {
    case '/login':
      return (
        <React.Fragment>
          <AuthNav
            currentUser={currentUser}
          />
          <Login 
            signUserIn={signUserIn}
            history={history}
          />
          <AuthFooter />
        </React.Fragment>
      )
      break
    
    case '/signup':
      return (
        <React.Fragment>
          <AuthNav
            currentUser={currentUser}
          />
          <SignUp 
            signUpUser={signUpUser}
            history={history} 
            currentUser={currentUser}
            setUserProfile={setUserProfile}
          />
          <AuthFooter />
        </React.Fragment>
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
