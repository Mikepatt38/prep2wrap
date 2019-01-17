import React, { Component } from 'react'
import withAuthorization from '../containers/withAuthorization'


export const Dashboard = ({ currentUser }) => (
  <div className="container">
    <h1>Welcome, {currentUser.firstName}</h1>
  </div>
)