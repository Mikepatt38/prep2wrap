import { connect } from 'react-redux'
import { setDropdownToggle } from '../actions/components'
import DashboardNavbar from '../components/General/Navbar'


const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
    authUser: state.sessionState.authUser,
    dropdownOpen: state.sessionState.dropdownOpen
  }
}

const mapDispatchToProps = (dispatch) => ({
  onToggleDropdown: (dropdownOpen) => dispatch(setDropdownToggle(dropdownOpen))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNavbar)