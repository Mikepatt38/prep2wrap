import React, { Component } from 'react'

import { auth } from '../../db'

const signOutStyles = {
  cursor: 'pointer'
}

class SignOutButton extends Component {
  render() {
    return (
      <a
        type="button"
        onClick={auth.doSignOut}
        style={signOutStyles}
      >
        Sign Out
      </a>
    )
  }
}

export default SignOutButton