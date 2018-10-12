import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { searchUsersByName } from '../actions/users'
import { setModal, setUserModal } from '../actions/components'
import { addUserToFavorite } from '../actions/accounts'
import UsersPage from '../pages/UsersPage'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    userSearchByNameResults: state.userState.userSearchByNameResults,
    userModalActive: state.sessionState.userModalActive,
    user: state.sessionState.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsersByName: bindActionCreators(searchUsersByName, dispatch),
    setModal: bindActionCreators(setModal, dispatch),
    setUserModal: bindActionCreators(setUserModal, dispatch),
    addUserToFavorite: bindActionCreators(addUserToFavorite, dispatch)
  }
}

const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(UsersPage)