import React from 'react'
import withAuthorization from '../components/withAuthorization'

const Dashboard = () =>
  <div>
    <h1>Dashboard Page</h1>
  </div>

const authCondition = (authUser) => !!authUser
export default withAuthorization(authCondition)(Dashboard)