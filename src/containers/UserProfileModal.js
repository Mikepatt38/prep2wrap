import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setUserModal } from '../actions/components'
import { addUserToFavorite } from '../actions/favorites'
import withAuthorization from './withAuthorization'
import UserProfileModal from '../components/UserProfileModal'

const mapStateToProps = (state) => {
  return {
    userModalActive: state.sessionState.userModalActive,
    user: state.sessionState.user,
    currentUser: state.userState.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserModal: bindActionCreators(setUserModal, dispatch),
    addUserToFavorite: bindActionCreators(addUserToFavorite, dispatch)
  }
}

const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(UserProfileModal)