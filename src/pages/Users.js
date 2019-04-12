import React from 'react'
import UserSearch from '../containers/UserSearch'
import UserFavorites from '../containers/UserFavorites'

const UsersPage = () => (
  <div className="app-page">
    <div className="app-page-title">
      <h1>Crew Search</h1>
    </div>
    <div className="app-page-section">
      <UserSearch />
    </div>

    <div className="app-page-title">
      <h1>Quick Crew</h1>
    </div>
    <div className="app-page-section">
      
    </div>
  </div> 
)

export default UsersPage
