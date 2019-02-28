import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { JobOverview } from '../pages/JobOverview'
import { createJob,
         createReduxJob,
         getJobOverviewData,
         acceptJobInvitation, 
         denyJobInvitation,
         createUserAcceptedJob,
         deletedCreatedJob } from '../actions/jobs'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.accountState.currentUser,
  }
}

const actions = {
  createJob,
  getJobOverviewData,
  acceptJobInvitation,
  denyJobInvitation,
  createUserAcceptedJob,
  deletedCreatedJob,
  createReduxJob
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(JobOverview)