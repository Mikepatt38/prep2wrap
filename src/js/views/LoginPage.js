import React, { Component } from 'react'
import {
  Link,
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