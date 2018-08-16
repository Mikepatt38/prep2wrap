import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setAvailabilityDate } from '../actions/availability'
import Availability from '../pages/Availability'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
    blackOutDates: state.availabilityState.availability
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAvailabilityDate: bindActionCreators(setAvailabilityDate, dispatch),
  }
}


const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Availability)