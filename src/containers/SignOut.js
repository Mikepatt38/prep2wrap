import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeCurrentUser } from '../actions/accounts'
import { auth } from '../db'

const signOutStyles = {
  cursor: 'pointer'
}

class SignOutButton extends Component {

  signOut = () => {
    this.props.removeCurrentUser()
    auth.doSignOut()
  }

  render() {
    return (
      <a
        type="button"
        onClick={this.signOut}
        style={signOutStyles}
      >
        Logout
      </a>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeCurrentUser: () => dispatch(removeCurrentUser()),
})

export default connect(null, mapDispatchToProps)(SignOutButton)