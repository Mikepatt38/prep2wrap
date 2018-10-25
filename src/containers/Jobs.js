import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import Jobs from '../pages/Jobs'
import { createJob } from '../actions/jobs'
import { setModal } from '../actions/components'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    createJob: bindActionCreators(createJob, dispatch),
    setModal: bindActionCreators(setModal, dispatch),
  }
}


const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Jobs)