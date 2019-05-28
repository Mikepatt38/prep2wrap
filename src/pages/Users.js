import React from 'react'
import UserSearch from '../containers/UserSearch'
import UserFavorites from '../containers/UserFavorites'

const UsersPage = () => (
  <div className="app-page">

    <div className="app-page-header">
      <h1>Users Directory</h1>
      <button className="button-primary button-header">Search Users</button>
    </div>

    <div className="app-page-body">
      <div className="app-page-section">
        <p>This is your quick crew, add members you hire or work with frequently to make it easier to communicate with them.</p>
        <UserFavorites />
      </div>    
    </div>

  </div> 
)

export default UsersPage


// <div className="app-page-section">
// <UserSearch />
// </div>
