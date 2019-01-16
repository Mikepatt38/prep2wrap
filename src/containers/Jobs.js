import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import Jobs from '../pages/Jobs'
import { createJob, userResultsForJobCreation } from '../actions/jobs'
import { setModal, setUserModal } from '../actions/components'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
    userModalActive: state.sessionState.userModalActive,
  }
}

const actions = {
  createJob,
  setModal,
  setUserModal,
  userResultsForJobCreation,
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}


const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Jobs)