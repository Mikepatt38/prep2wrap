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

const actions = {
  searchUsersByName,
  setUserModal,
  clearSearchUserByNameResults,
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(UserSearch)