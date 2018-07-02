import React from 'react'
import {
  withRouter,
} from 'react-router-dom'

import SignUpForm from '../components/SignUpForm'

const SignUpPage = ({history}) => {
  return (
    <section>
      <SignUpForm history={history} />
    </section>
  )
}

export default withRouter(SignUpPage)