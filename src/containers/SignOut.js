import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signUserOut, removeCurrentUser } from '../actions/accounts'
import Signout from '../components/Auth/Signout'

const mapStateToProps = (state) => {
  return {
    currentUser: state.accountState.currentUser,
  }
}

const actions = {
  removeCurrentUser,
  signUserOut
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signout)