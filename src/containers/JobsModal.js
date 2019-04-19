import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { closeModal } from '../actions/components'
import { setJobsModal } from '../actions/jobs'
import withAuthorization from './withAuthorization'
import JobsModal from '../components/Jobs/JobsModal'

const mapStateToProps = (state) => {
  return {
    currentUser: state.accountState.currentUser,
    jobModalActive: state.sessionState.jobModalActive,
    jobModalData: state.sessionState.jobModalData
  }
}

const actions = {
  setJobsModal,
  closeModal,
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(JobsModal)