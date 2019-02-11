import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import Jobs from '../pages/Jobs'
import { createJob, userResultsForJobCreation, createJobNotification } from '../actions/jobs'
import { setModal, setUserModal } from '../actions/components'
import withAuthorization from './withAuthorization'
import CreateJobFormStepOne from '../components/CreateJobFormStepOne';


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
  createJobNotification
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const authCondition = (authUser) => !!authUser

const jobContainerCreator = connect(mapStateToProps, mapDispatchToProps)

export const JobsPage = compose(
  withAuthorization(authCondition),
  jobContainerCreator
)(Jobs)

export const CreateJobFormStep1 = compose(
  withAuthorization(authCondition),
  jobContainerCreator
)(CreateJobFormStepOne)


