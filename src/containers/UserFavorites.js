import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setUserModal } from '../actions/components'
import { addUserToFavorite, getUserFavorites, stopListeningForFavorites } from '../actions/favorites'
import UserFavorites from '../components/UserFavorites'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
    userModalActive: state.sessionState.userModalActive,
    favorites: state.favoritesState.favorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
)(UserFavorites)