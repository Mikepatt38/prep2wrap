import React from 'react'
import {
  withRouter,
} from 'react-router-dom'
import logo from '../../img/logo.svg'

import LoginForm from '../components/LoginForm'

const LoginPage = ({history}) => {
  return (
    <div className="container container__form">
      <img className="logo" src={logo} alt="The Calltime Logo" />
      <LoginForm history={history} />
    </div>
  )
}

export default withRouter(LoginPage)