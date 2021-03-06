import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { usersSearch, clearSearchUserByNameResults } from '../actions/accounts'
import { updateUserFavorites } from '../actions/favorites'
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
  usersSearch,
  setUserModal,
  clearSearchUserByNameResults,
  updateUserFavorites
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(UserSearch)