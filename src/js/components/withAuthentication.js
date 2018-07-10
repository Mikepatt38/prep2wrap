import React from 'react'
import { connect } from 'react-redux'
import { authUserSet } from '../../actions/index'
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
      return (
        <Component />
      )
    }
  }
  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch(authUserSet(authUser)),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication)
}
export default withAuthentication