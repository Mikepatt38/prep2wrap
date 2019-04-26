import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import Jobs from '../pages/Jobs'
import { createJob,
         getUserJobs,
         deletedCreatedJob,
         userResultsForJobCreation, 
         createUserJobNotification, 
         createReduxJob,
         updateReduxJobAssignedUsers,
         getAllUsersData,
         setJobsModal,
         completeUserJob,
         createPendingJob,
         createUserAcceptedJob,
         acceptJobInvitation,
         denyJobInvitation
        } from '../actions/jobs'
import { setModal, setUserModal } from '../actions/components'
import withAuthorization from './withAuthorization'
import CreateJobFormStepOne from '../components/Jobs/CreateJobFormStepOne';
import CreateJobFormStepTwo from '../components/Jobs/CreateJobFormStepTwo';
import CreateJobFormStepThree from '../components/Jobs/CreateJobFormStepThree';
import SendSMSTwilio from '../components/Jobs/SendSMSTwilio';


const mapStateToProps = (state) => {
  return {
    currentUser: state.accountState.currentUser,
    userModalActive: state.sessionState.userModalActive,
    currentJob: state.jobsState.currentJob,
    jobModalActive: state.sessionState.jobModalActive,
    jobModalData: state.sessionState.jobModalData
  }
}

const actions = {
  createJob,
  getUserJobs,
  setModal,
  setUserModal,
  userResultsForJobCreation,
  createUserJobNotification,
  createReduxJob,
  updateReduxJobAssignedUsers,
  deletedCreatedJob,
  getAllUsersData,
  setJobsModal,
  completeUserJob,
  createPendingJob,
  createUserAcceptedJob,
  acceptJobInvitation,
  denyJobInvitation
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const authCondition = (authUser) => !!authUser

const jobContainerCreator = connect(mapStateToProps, mapDispatchToProps)

export const JobsPage = compose(
  withAuthorization(authCondition),
  withRouter,
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


