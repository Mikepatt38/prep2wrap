import React, { Component } from 'react'
import { UserFavoritesTable } from './UserFavoritesTable'
import CrewIllustration from '../../img/illustrations/crew.svg'
import EmptyState from '../General/EmptyState'

function UserFavorites(props){
  return (
    <React.Fragment>
      {
        props.currentUser.favorites && props.currentUser.favorites.length
        ?
          <React.Fragment>
            <p>This is your quick crew, add members you hire or work with frequently to make it easier to communicate with them.</p>
            <UserFavoritesTable
              currentUser={props.currentUser}
              getCurrentFavorites={props.getCurrentFavorites}
              removeUserFromUserFavorites={props.removeUserFromUserFavorites}
            />
          </React.Fragment>
        :
        <EmptyState
          imgSrc={CrewIllustration}
          imgAlt="Availability Page Illustration"
          title="You do not have any members in your quick crew."
          text="To add crew members, use the quick search below to find crew members and add them as a to your quick crew from the search results table."
        />
      }
    </React.Fragment>
  )
}

export default UserFavorites
