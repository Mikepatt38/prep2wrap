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
import { sendSMSAlerts } from '../actions/twilio'
import withAuthorization from './withAuthorization'
import CreateJobFormStepOne from '../components/Jobs/CreateJobFormStepOne';
import CreateJobFormStepTwo from '../components/Jobs/CreateJobFormStepTwo';


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
  denyJobInvitation,
  sendSMSAlerts
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


