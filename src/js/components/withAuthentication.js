import React from 'react'
import { connect } from 'react-redux'
import { firebase } from '../../db'

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    state = {
      authUser: null
    }
  
    componentDidMount = () => {
      const { onSetAuthUser } = this.props

      firebase.auth.onAuthStateChanged( authUser => {
        authUser 
          ? onSetAuthUser(authUser)
          : onSetAuthUser(null)
      })
    }

    render() {
      const { authUser } = this.state
      return (
        <Component />
      )
    }
  }
  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication)
}
export default withAuthentication