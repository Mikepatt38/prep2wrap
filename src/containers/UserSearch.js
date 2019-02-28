import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { searchUsersByName, clearSearchUserByNameResults } from '../actions/accounts'
import { setUserModal } from '../actions/components'
import { UserSearch } from '../components/Users/UserSearch'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.accountState.currentUser,
    userSearchByNameResults: state.accountState.userSearchByNameResults,
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