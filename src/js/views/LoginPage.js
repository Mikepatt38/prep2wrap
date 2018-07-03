import React from 'react'
import {
  withRouter,
} from 'react-router-dom'

import LoginForm from '../components/LoginForm'
import { PasswordResetLink } from '../components/PasswordResetForm'

const LoginPage = ({history}) => {
  return (
    <section>
      <LoginForm history={history} />
      <PasswordResetLink />
    </section>
  )
}

export default withRouter(LoginPage)