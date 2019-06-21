import { connect } from 'react-redux'
// import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setUserModal } from '../actions/components'
import { addToUsersFavorites } from '../actions/favorites'
// import withAuthorization from './withAuthorization'
import UserProfileModal from '../components/Users/UserProfileModal'

const mapStateToProps = (state) => {
  return {
    userModalActive: state.sessionState.userModalActive,
    currentUser: state.accountState.currentUser
  }
}

const actions = {
  addToUsersFavorites
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileModal)