import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import Dashboard from '../pages/Dashboard'
import { getUserJobNotifications, removeUserJobNotification, getUserJobCount } from '../actions/jobs'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.accountState.currentUser,
  }
}

const actions = {
  getUserJobNotifications,
  removeUserJobNotification,
  getUserJobCount
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard)