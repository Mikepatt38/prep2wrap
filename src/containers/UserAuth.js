import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setUserProfile, signUserIn, signUpUser, resetPassword, setGlobalAlert } from '../actions/accounts'
import { setAlert } from '../actions/components'
import UserAuth from '../pages/UserAuth'

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  currentUser: state.accountState.currentUser,
  active: state.sessionState.alertActive,
  alertText: state.sessionState.alertText,
  alertType: state.sessionState.alertType
})

const actions = {
  signUserIn,
  signUpUser,
  resetPassword,
  setUserProfile,
  setAlert,
  setGlobalAlert
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth)