import React from 'react'
import {
  withRouter,
} from 'react-router-dom'

import LoginForm from '../components/LoginForm'

const LoginPage = ({history}) => {
  return (
    <section>
      <LoginForm history={history} />
    </section>
  )
}

export default withRouter(LoginPage)