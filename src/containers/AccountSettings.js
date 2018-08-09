import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setName, setEmail } from '../actions/accounts'
import AccountSettings from '../pages/AccountSettings'
import withAuthorization from './withAuthorization'

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

const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSettings)
