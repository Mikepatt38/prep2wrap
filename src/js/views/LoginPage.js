import React from 'react'
import {
  withRouter,
} from 'react-router-dom'

import LoginForm from '../components/LoginForm'

const LoginPage = ({history}) => {
  return (
    <div className="container form-container">
      <LoginForm history={history} />
    </div>
  )
}

export default withRouter(LoginPage)