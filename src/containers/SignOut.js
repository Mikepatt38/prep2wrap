import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signUserOut, removeCurrentUser } from '../actions/accounts'
import Signout from '../components/Auth/Signout'

const actions = {
  removeCurrentUser,
  signUserOut
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(null, mapDispatchToProps)(Signout)