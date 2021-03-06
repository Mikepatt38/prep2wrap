import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setUserModal } from '../actions/components'
import { addToUsersFavorites,
         getUserFavorites,
         getCurrentFavorites,
         stopListeningForFavorites,
         removeUserFromUserFavorites,
         updateUserFavorites } from '../actions/favorites'
import UserFavorites from '../components/Users/UserFavorites'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.accountState.currentUser,
    userModalActive: state.sessionState.userModalActive,
    favorites: state.favoritesState.favorites
  }
}

const actions = {
  setUserModal,
  addToUsersFavorites,
  getUserFavorites,
  getCurrentFavorites,
  stopListeningForFavorites,
  removeUserFromUserFavorites,
  updateUserFavorites
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(UserFavorites)