import React from 'react'
import UserSearch from '../containers/UserSearch'
import UserFavorites from '../containers/UserFavorites'

const UsersPage = () => (
  <div className="app-page">
    <div className="app-page-title">
      <h1>Users</h1>
    </div>
    <div className="app-page-section">
      <UserSearch />
    </div>
    <div className="app-page-section">
      <div className="section-title">
        <h3>User's Favorites:</h3>
      </div>
      <UserFavorites />
    </div>
  </div> 
)

// <div className="card">
// <div className="card-header">
//   <h3>User Search</h3>
//   <p>Search for other user's profiles and information using the table below.</p>
// </div>
// <div className="card-body">
//   <UserSearch />
// </div>
// </div>

export default UsersPage
