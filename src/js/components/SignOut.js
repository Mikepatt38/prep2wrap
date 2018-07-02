import React, { Component } from 'react'

import { auth } from '../../db'

class SignOutButton extends Component {
  render() {
    return (
      <button
        type="button"
        onClick={auth.doSignOut}
      >
        Sign Out
      </button>
    )
  }
}

export default SignOutButton