import React from 'react'
import {
  withRouter,
} from 'react-router-dom'
import logo from '../../img/logo.svg'

import SignUpForm from '../components/SignUpForm'

const SignUpPage = ({history}) => {
  return (
    <div className="container container__form">
      <img className="logo" src={logo} alt="The Calltime Logo" />
      <SignUpForm history={history} />
    </div>
  )
}

export default withRouter(SignUpPage)