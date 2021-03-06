import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setName, setEmail, setMobileNumber, setUserProfile, setAccountView, uploadProfileImage, deleteUserAccount, updateUserCardInfo, updateUserPassword} from '../actions/accounts'
import AccountSettings from '../pages/Settings'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.accountState.currentUser,
    accountView: state.accountState.accountView
  }
}

const actions = {
  setName,
  setEmail,
  setMobileNumber,
  setUserProfile,
  setAccountView,
  uploadProfileImage,
  deleteUserAccount,
  updateUserCardInfo,
  updateUserPassword
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSettings)
