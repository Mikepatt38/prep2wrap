import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import Jobs from '../pages/Jobs'
import { createJob, userResultsForJobCreation } from '../actions/jobs'
import { setModal } from '../actions/components'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
    userResults: state.jobsState.userResults
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    createJob: bindActionCreators(createJob, dispatch),
    setModal: bindActionCreators(setModal, dispatch),
    userResultsForJobCreation: bindActionCreators(userResultsForJobCreation, dispatch)
  }
}


const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Jobs)