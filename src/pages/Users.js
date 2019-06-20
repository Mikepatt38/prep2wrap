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

  render() {
    return (
      <div className="app-page">
      <Modal
        active={this.state.modalActive}
        title="Search Users"
        children={<UserSearch />}
      />

        <div className="app-page-header">
          <h1>Users Directory</h1>
          <button className="button-primary button-header" onClick={(e) => this.openSearchUsers(e, this.props)}>Search Users</button>
        </div>
    
        <div className="app-page-body">
          <div className="app-page-section">
            <p>This is your quick crew, add members you hire or work with frequently to make it easier to communicate with them.</p>
            <UserFavorites />
          </div>    
        </div>
    
      </div>  
    )
  }
}

export default UsersPage

