import React from 'react'
import { UserSearch } from '../components/UserSearch'
import { Card } from '../components/Card'

const UsersPage = ({ searchUsersByName, setModal }) => {
  return (
    <div className="container">
      <h1 className="page-title">Search For Users
      <button 
          className="button-primary button-inline" 
          onClick={() => 
            setModal(true, "Search users by name", <UserSearch searchUsersByName={searchUsersByName} />
        )}>Search Users</button></h1>
      <Card
        cardTitle="Favorites"
        cardText="These are your favorited users that you personally vouch for or support."
      />
    </div>  
  )
}

export default UsersPage