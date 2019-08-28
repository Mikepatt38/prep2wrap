import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCurrentUser } from '../actions/accounts'
import { firebase } from '../db'

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    state = {
      authUser: null
    }
  
    componentDidMount = () => {
      const { getCurrentUser } = this.props

      firebase.auth.onAuthStateChanged( authUser => {
        return authUser 
          ? getCurrentUser(authUser.uid.toString())
          : null
      })
    }

    render() {
      return (
        <Component />
      )
    }
  }

  const actions = {
    getCurrentUser
  }

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
  }

  return connect(null, mapDispatchToProps)(WithAuthentication)
}
export default withAuthentication