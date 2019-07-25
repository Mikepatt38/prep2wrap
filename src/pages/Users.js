import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserSearch from '../containers/UserSearch'
import UserFavorites from '../containers/UserFavorites'
import Modal from '../components/General/Modal'

class UsersPage extends Component {
  state = {
    modalActive: false,
  }

  openSearchUsers = (e, props) => {
    e.preventDefault()
    this.setState({ modalActive: true })
  }

  toggleModal = () => {
    this.setState({
      modalActive: !this.state.modalActive
    })
  }

  render() {
    return (
      <div className="app-page">
      <Modal
        active={this.state.modalActive}
        title="Search Crew"
        children={
          <UserSearch
            close={this.toggleModal}
          />
        }
      />

      <div className="workspace">
        <div className="workspace-desktop">
          <div className="workspace-tab-list">
            <Link to="/" className="link">Dashboard</Link>
            <Link to="/availability" className="link">Availability</Link>
            <Link to="/jobs" className="link">Jobs</Link>
            <Link to="/crew" className="active">Crew</Link>
            <Link to="/account-settings" className="link">Settings</Link>
          </div>
        </div>
      </div>
    
        <div className="app-page-body">
          <div className="app-page-section">
            <UserFavorites />
          </div> 
          
          <div className="app-page-section app-page-section-bottom">
            <p>Search for crew members to grow and build your network or add a user to your quick crew.</p>
            <UserSearch />
          </div> 
        </div>
    
      </div>  
    )
  }
}

export default UsersPage

