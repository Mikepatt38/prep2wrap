import React from 'react'
import {
  withRouter,
} from 'react-router-dom'
import logo from '../../img/logo.svg'

import PasswordResetForm from '../components/PasswordResetForm'

const PasswordReset = ({history}) => {
  return (
    <div className="container container__form">
      <img className="logo" src={logo} alt="The Calltime Logo" />
      <PasswordResetForm history={history} />
    </div>
  )
}

export default withRouter(PasswordReset)