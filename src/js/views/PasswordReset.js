import React from 'react'
import {
  withRouter,
} from 'react-router-dom'

import PasswordResetForm from '../components/PasswordResetForm'

const PasswordReset = ({history}) => {
  return (
    <section>
      <PasswordResetForm history={history} />
    </section>
  )
}

export default withRouter(PasswordReset)