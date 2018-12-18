import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { searchUsersByName } from '../actions/users'
import { setUserModal } from '../actions/components'
import { addUserToFavorite, getUserFavorites, stopListeningForFavorites } from '../actions/favorites'
import { UserSearch } from '../components/UserSearch'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
    userSearchByNameResults: state.userState.userSearchByNameResults,
    favorites: state.favoritesState.favorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsersByName: bindActionCreators(searchUsersByName, dispatch),
    setUserModal: bindActionCreators(setUserModal, dispatch),
    addUserToFavorite: bindActionCreators(addUserToFavorite, dispatch),
    getUserFavorites: bindActionCreators(getUserFavorites, dispatch),
    stopListeningForFavorites: bindActionCreators(stopListeningForFavorites, dispatch)
  }
}

const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(UserSearch)