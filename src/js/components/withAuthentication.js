import React from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../../actions/users'
import { firebase } from '../../db'

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    state = {
      authUser: null
    }
  
    componentDidMount = () => {
      const { getCurrentUser } = this.props

      firebase.auth.onAuthStateChanged( authUser => {
        authUser 
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
  const mapDispatchToProps = (dispatch) => ({
    getCurrentUser: (id) => dispatch(getCurrentUser(id)),
  })

  return connect(null, mapDispatchToProps)(WithAuthentication)
}
export default withAuthentication