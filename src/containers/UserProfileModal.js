import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setUserModal, closeModal } from '../actions/components'
import { addToUsersFavorites } from '../actions/favorites'
import withAuthorization from './withAuthorization'
import UserProfileModal from '../components/Users/UserProfileModal'

const mapStateToProps = (state) => {
  return {
    userModalActive: state.sessionState.userModalActive,
    user: state.sessionState.user,
    currentUser: state.accountState.currentUser
  }
}

const actions = {
  setUserModal,
  closeModal,
  addToUsersFavorites
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(UserProfileModal)