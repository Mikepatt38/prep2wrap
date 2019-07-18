import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import Dashboard from '../pages/Dashboard'
import { getUserJobNotifications, removeUserJobNotification } from '../actions/jobs'
import { updateUserAvailability, removeAvailabilityDate } from '../actions/availability'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.accountState.currentUser,
  }
}

const actions = {
  getUserJobNotifications,
  removeUserJobNotification,
  updateUserAvailability,
  removeAvailabilityDate
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard)