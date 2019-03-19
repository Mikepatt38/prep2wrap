import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setName, setEmail, setMobileNumber, setUserProfile, setAccountView, uploadProfileImage, setGlobalAlert } from '../actions/accounts'
import { setAlert, setModal } from '../actions/components'
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
  setAlert,
  setModal,
  uploadProfileImage,
  setGlobalAlert
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSettings)
