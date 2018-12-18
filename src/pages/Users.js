import React from 'react'
import UserSearch from '../containers/UserSearch'
import UserFavorites from '../containers/UserFavorites'

const UsersPage = () => (
  <React.Fragment>
    <div className="container containerMargin">
      <div className="card">
        <div className="card-header">
          <h3>User Search</h3>
          <p>Search for other user's profiles and information using the table below.</p>
        </div>
        <div className="card-body">
          <UserSearch />
        </div>
      </div>
    </div> 
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h3>Favorited Users</h3>
          <p>These are your top eight recommendations from people in the industry that you vouch for.</p>
        </div>
        <div className="card-body">
          <UserFavorites />
        </div>
      </div>
    </div> 
  </React.Fragment>
)

export default UsersPage
