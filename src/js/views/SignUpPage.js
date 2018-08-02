import React from 'react'
import {
  withRouter,
} from 'react-router-dom'
import logo from '../../img/logo.svg'

import SignUpForm from '../components/SignUpForm'

const SignUpPage = ({history}) => {
  return (
    <div className="page-background">
      <div className="page-background-skewed"></div>
      <div className="logo">
        <img src={logo} alt="The Calltime Login Page Logo" />
      </div>
      <div className="container container--form">
      <SignUpForm history={history} />
      </div>
    </div>
  )
}

export default withRouter(SignUpPage)