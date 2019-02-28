import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setUserProfile, signUserIn, signUpUser, resetPassword } from '../actions/accounts'
import UserAuth from '../pages/UserAuth'

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  currentUser: state.accountState.currentUser
})

const mapDispatchToProps = (dispatch) => {
  return {
    signUserIn: bindActionCreators(signUserIn, dispatch),
    signUpUser: bindActionCreators(signUpUser, dispatch),
    resetPassword: bindActionCreators(resetPassword, dispatch),
    setUserProfile: bindActionCreators(setUserProfile, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth)