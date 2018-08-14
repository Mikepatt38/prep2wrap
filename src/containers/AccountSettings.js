import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setName, setEmail, setUserProfile, setAccountView } from '../actions/accounts'
import { setAlert } from '../actions/components'
import AccountSettings from '../pages/AccountSettings'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
    accountView: state.accountState.accountView
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setName: bindActionCreators(setName, dispatch),
    setEmail: bindActionCreators(setEmail, dispatch),
    setUserProfile: bindActionCreators(setUserProfile, dispatch),
    setAccountView: bindActionCreators(setAccountView, dispatch),
    setAlert: bindActionCreators(setAlert, dispatch)
  }
}

const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSettings)
