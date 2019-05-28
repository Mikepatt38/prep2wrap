import React from 'react'
import UserSearch from '../containers/UserSearch'
import UserFavorites from '../containers/UserFavorites'

const UsersPage = () => (
  <div className="app-page">

    <div className="app-page-header">
      <h1>Users Directory</h1>
    </div>

    <div className="app-page-body">
      <div className="app-page-section">
        <UserSearch />
      </div>

      <div className="app-page-title">
        <h1>Quick Crew</h1>
      </div>
      <div className="app-page-section">
        <UserFavorites />
      </div>    
    </div>

  </div> 
)

export default UsersPage
