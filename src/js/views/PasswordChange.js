import React from 'react'
import {
  withRouter,
} from 'react-router-dom'

import PasswordChangeForm from '../components/PasswordChangeForm'

const PasswordChange = ({history}) => {
  return (
    <section>
      <PasswordChangeForm history={history} />
    </section>
  )
}

export default withRouter(PasswordChange)