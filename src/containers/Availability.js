import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setAvailabilityDate, getAvailabilityDates, stopListeningForDates } from '../actions/availability'
import { setModal } from '../actions/components'
import Availability from '../pages/Availability'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
    dates: state.availabilityState.availability,
    userDates: state.availabilityState.userDates,
    fetching: state.availabilityState.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAvailabilityDates: bindActionCreators(getAvailabilityDates, dispatch),
    setAvailabilityDate: bindActionCreators(setAvailabilityDate, dispatch),
    stopListeningForDates: bindActionCreators(stopListeningForDates, dispatch),
    setModal: bindActionCreators(setModal, dispatch)
  }
}


const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Availability)