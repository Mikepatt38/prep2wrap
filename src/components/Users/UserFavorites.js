import React, { Component } from 'react'
import { UserFavoritesTable } from './UserFavoritesTable'

function UserFavorites(props){
  return (
    <React.Fragment>
      {
        props.currentUser.favorites
        ?
          <UserFavoritesTable
            currentUser={props.currentUser}
            getCurrentFavorites={props.getCurrentFavorites}
            removeUserFromUserFavorites={props.removeUserFromUserFavorites}
          />
        :
        <div className="empty-state">
          <p>You currently do not have any crew members in your quick crew.</p>
          <p>To add crew members, use the quick search below to find crew members and add them as a to your quick crew from the search results table.</p>
        </div>
      }
    </React.Fragment>
  )
}

export default UserFavorites
