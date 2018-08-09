import { connect } from 'react-redux'
import { setAlert } from '../actions/components'
import { Alert } from '../components/Alert'

const mapStateToProps = (state) => ({
  active: state.sessionState.alertActive,
  alertText: state.sessionState.alertText,
  alertType: state.sessionState.alertType
})

const mapDispatchToProps = (dispatch) => ({
  onSetAlert: (alertActive, alertType, text) => dispatch(setAlert(alertActive, alertType, text))
})

export default connect(mapStateToProps, mapDispatchToProps)(Alert)