import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { searchUsersByName } from '../actions/users'
import { setModal } from '../actions/components'
import UsersPage from '../pages/UsersPage'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    userSearchByNameResults: state.userState.userSearchByNameResults
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsersByName: bindActionCreators(searchUsersByName, dispatch),
    setModal: bindActionCreators(setModal, dispatch)
  }
}

const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(UsersPage)