import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setName, setEmail } from '../actions/accounts'
import AccountSettings from '../pages/AccountSettings'

const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setName: bindActionCreators(setName, dispatch),
    setEmail: bindActionCreators(setEmail, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings)
