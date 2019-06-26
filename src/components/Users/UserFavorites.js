import React, { Component } from 'react'
import { UserFavoritesTable } from './UserFavoritesTable'
import { throwStatement } from '@babel/types';

function UserFavorites(props){
  return (
    <React.Fragment>
      {
        props.currentUser.favorites.length
        ?
          <UserFavoritesTable
            currentUser={props.currentUser}
            getCurrentFavorites={props.getCurrentFavorites}
            removeUserFromUserFavorites={props.removeUserFromUserFavorites}
          />
        :
        <div className="empty-state">
          <p>You currently do not have any users in your quick crew.</p>
          <p>To add users, use the quick search below to find crew members and add them as a to your quick crew from the search results table.</p>
        </div>
      }
    </React.Fragment>
  )
}

export default UserFavorites
