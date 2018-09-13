import React from 'react'
import { PageHeader } from '../components/PageHeader'
import { UserSearch } from '../components/UserSearch'
import { Card } from '../components/Card'
import Table from '../components/Table'

const UsersPage = ({ searchUsersByName, setModal, userSearchByNameResults }) => {
  return (
    <React.Fragment>
      <PageHeader pageTitle="Users Directory" />
      <div className="container">
        <h2 className="component-title">Search For Users</h2>
        <p className="component-text">This is text that will be shown above the components such as tables and calendar to give a brief description.</p>
        <div className="component-section">
          <UserSearch searchUsersByName={searchUsersByName} />
        </div>
      </div>  
    </React.Fragment>
  )
}

export default UsersPage


// <button 
// className="button-primary button-inline" 
// onClick={() => 
//   setModal(true, "Search users by name", <UserSearch searchUsersByName={searchUsersByName} />
// )}>Search Users</button>