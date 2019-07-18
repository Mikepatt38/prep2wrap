import React, { Component } from 'react'
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

        <div className="app-page-header">
          <h1>Crew Directory</h1>
        </div>
    
        <div className="app-page-body">
          <div className="app-page-section">
            <UserFavorites />
          </div> 
          
          <div className="app-page-section">
            <p>Search for crew members to grow and build your network or add a user to your quick crew.</p>
            <UserSearch />
          </div> 
        </div>
    
      </div>  
    )
  }
}

// <button className="button-primary button-header" onClick={(e) => this.openSearchUsers(e, this.props)}>Search Users</button>

export default UsersPage

