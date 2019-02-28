import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setName, setEmail, setMobileNumber, setUserProfile, setAccountView, uploadProfileImage } from '../actions/accounts'
import { setAlert, setModal } from '../actions/components'
import AccountSettings from '../pages/Settings'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.accountState.currentUser,
    accountView: state.accountState.accountView
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setName: bindActionCreators(setName, dispatch),
    setEmail: bindActionCreators(setEmail, dispatch),
    setMobileNumber: bindActionCreators(setMobileNumber, dispatch),
    setUserProfile: bindActionCreators(setUserProfile, dispatch),
    setAccountView: bindActionCreators(setAccountView, dispatch),
    setAlert: bindActionCreators(setAlert, dispatch),
    setModal: bindActionCreators(setModal, dispatch),
    uploadProfileImage: bindActionCreators(uploadProfileImage, dispatch)
  }
}

const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSettings)
