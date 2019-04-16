import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { updateUserAvailability, removeAvailabilityDate, setAvailabilityDate, getCurrentAvailability } from '../actions/availability'
import { setModal, closeModal } from '../actions/components'
import Availability from '../pages/Availability'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.accountState.currentUser,
    dates: state.availabilityState.availability,
    userDates: state.availabilityState.userDates,
    fetching: state.availabilityState.fetching
  }
}

const actions = {
  getCurrentAvailability,
  updateUserAvailability,
  setAvailabilityDate,
  removeAvailabilityDate,
  setModal,
  closeModal
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Availability)