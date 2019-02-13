import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { searchUsersByName, clearSearchUserByNameResults } from '../actions/users'
import { setUserModal } from '../actions/components'
import { UserSearch } from '../components/Users/UserSearch'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
    userSearchByNameResults: state.userState.userSearchByNameResults,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsersByName: bindActionCreators(searchUsersByName, dispatch),
    setUserModal: bindActionCreators(setUserModal, dispatch),
    clearSearchUserByNameResults: bindActionCreators(clearSearchUserByNameResults, dispatch)
  }
}

const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(UserSearch)