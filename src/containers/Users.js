import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { searchUsersByName } from '../actions/users'
import UsersPage from '../pages/UsersPage'
import withAuthorization from './withAuthorization'

const mapStateToProps = (state) => {
  return {
    userSearchByNameResults: state.userState.userSearchByNameResults
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsersByName: bindActionCreators(searchUsersByName, dispatch)
  }
}

const authCondition = (authUser) => !!authUser


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(UsersPage)