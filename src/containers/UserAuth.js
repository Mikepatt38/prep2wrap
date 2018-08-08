import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signUserIn, signUpUser, resetPassword } from '../actions/users'
import UserAuth from '../pages/UserAuth'

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
})

const mapDispatchToProps = (dispatch) => {
  return {
    signUserIn: bindActionCreators(signUserIn, dispatch),
    signUpUser: bindActionCreators(signUpUser, dispatch),
    resetPassword: bindActionCreators(resetPassword, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth)