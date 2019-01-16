import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { JobOverview } from '../pages/JobOverview'
import { createJob, getJobOverviewData, acceptJobInvitation } from '../actions/jobs'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
  }
}

const actions = {
  createJob,
  getJobOverviewData,
  acceptJobInvitation
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(JobOverview)