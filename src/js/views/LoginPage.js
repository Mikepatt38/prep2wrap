import React from 'react'
import {
  withRouter,
} from 'react-router-dom'
import logo from '../../img/logo.svg'

import LoginForm from '../components/LoginForm'

const LoginPage = ({history}) => {
  return (
    <div className="page-background">
      <div className="page-background-skewed"></div>
      <div className="logo">
        <img src={logo} alt="The Calltime Login Page Logo" />
      </div>
      <div className="container container--form">
        <LoginForm history={history} />
      </div>
    </div>
  )
}

export default withRouter(LoginPage)