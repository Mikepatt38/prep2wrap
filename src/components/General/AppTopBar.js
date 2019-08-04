import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import UserProfileModal from '../Users/UserProfileModal'
import MainLogo from '../../img/prep2wrap-white-logo.png'
import Signout from '../../containers/SignOut'
import ProfileIcon from '../../img/icon-user.svg'

class AppTopBar extends Component {
  state = {
    user: this.props.currentUser,
    modalActive: false
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.currentUser !== this.props.currentUser){
      this.setState({
        user: this.props.currentUser
      })
    }
  }

  handleViewProfile = (user) => {
    this.setState({
      user: this.props.currentUser,
      modalActive: true
    })
  }
  
  toggleModal = () => {
    this.setState({
      modalActive: !this.state.modalActive
    })
  }

  render() {
    return (
      <React.Fragment>
        <UserProfileModal
          currentUser={this.props.currentUser}
          active={this.state.modalActive}
          user={this.state.user}
          close={this.toggleModal}
        />
        <header className="app-topbar">
          <div className="logo">
            <img src={MainLogo} alt="White Prep 2 Wrap Logo" />
          </div>
          <ul className="links">
            <li><img onClick={() => this.handleViewProfile(this.props.currentUser)} src={ProfileIcon} alt="Profile Icon" /></li>
            <li>
              <Signout />
            </li>
          </ul>
        </header>
      </React.Fragment>
    )
  }
}

export default AppTopBar