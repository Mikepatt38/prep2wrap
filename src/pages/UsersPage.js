import React from 'react'
import { UserSearch } from '../components/UserSearch'
import { Card } from '../components/Card'
import Table from '../components/Table'

const UsersPage = ({ searchUsersByName, setModal }) => {
  return (
    <div className="container">
      <h1 className="page-title">Search For Users
      <button 
          className="button-primary button-inline" 
          onClick={() => 
            setModal(true, "Search users by name", <UserSearch searchUsersByName={searchUsersByName} />
        )}>Search Users</button></h1>
      <Table 
        headers={['name', 'location', 'available', '']}
        data={[
          {
            name: 'Michael Jones',
            location: 'Los Angeles, CA',
            available: 'true'
          },
          {
            name: 'Ben Patterson',
            location: 'Los Angeles, CA',
            available: 'false'
          },
          {
            name: 'Hannah Patterson',
            location: 'Los Angeles, CA',
            available: 'true'
          },
        ]}
      />
    </div>  
  )
}

export default UsersPage