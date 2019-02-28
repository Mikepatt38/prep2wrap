import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setUserProfile, signUserIn, signUpUser, resetPassword } from '../actions/accounts'
import UserAuth from '../pages/UserAuth'

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  currentUser: state.accountState.currentUser
})

const actions = {
  signUserIn,
  signUpUser,
  resetPassword,
  setUserProfile,
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth)