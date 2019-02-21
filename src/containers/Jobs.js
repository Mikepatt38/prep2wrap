import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import Jobs from '../pages/Jobs'
import { createJob,
         getUserJobs,
         userResultsForJobCreation, 
         createJobNotification, 
         createReduxJob,
         updateReduxJobAssignedUsers
        } from '../actions/jobs'
import { setModal, setUserModal } from '../actions/components'
import withAuthorization from './withAuthorization'
import CreateJobFormStepOne from '../components/Jobs/CreateJobFormStepOne';
import CreateJobFormStepTwo from '../components/Jobs/CreateJobFormStepTwo';
import CreateJobFormStepThree from '../components/Jobs/CreateJobFormStepThree';
import SendSMSTwilio from '../components/Jobs/SendSMSTwilio';


const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
    userModalActive: state.sessionState.userModalActive,
    currentJob: state.jobsState.currentJob
  }
}

const actions = {
  createJob,
  getUserJobs,
  setModal,
  setUserModal,
  userResultsForJobCreation,
  createJobNotification,
  createReduxJob,
  updateReduxJobAssignedUsers
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

export const CreateJobFormStep2 = compose(
  withAuthorization(authCondition),
  jobContainerCreator
)(CreateJobFormStepTwo)

export const CreateJobFormStep3 = compose(
  withAuthorization(authCondition),
  jobContainerCreator
)(CreateJobFormStepThree)

export const SendJobInvites = compose(
  withAuthorization(authCondition),
  jobContainerCreator
)(SendSMSTwilio)


