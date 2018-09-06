import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { UserProfileForm } from '../components/UserProfileForm'
import UserInfoForm from '../components/UserInfoForm'

const AccountSettings = ({ currentUser, setModal, setName, setEmail }) => {
  return (
    <div className="container">
      <h1 className="page-title">Account Settings</h1>
      <div className="settings">
        <div className="card">
          <div className="card-header">
            <h2>Basic Information <button onClick={() => setModal(true, "Update account information", 
              <UserInfoForm setName={setName} currentUser={currentUser} />)} className="button-primary button-card">Update</button>
            </h2>
            <p>Your basic account information, hover over the text to update the field.</p>
          </div>
          <div className="card-item">
            <label>Account Name: </label>
            <p> {currentUser.firstName} {currentUser.lastName}</p>
          </div>
          <div className="card-item">
            <label>Account Email: </label>
            <p> {currentUser.email}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>User Profile <button onClick={() => setModal(true, "Update profile information", 
              <UserInfoForm setName={setName} setEmail={setEmail} currentUser={currentUser} />)} className="button-primary button-card">Update</button>
            </h2>
            <p>Your public profile information, it can be updated at any time.</p>
          </div>
          <div className="card-item">
            <label>Account Name: </label>
            <p> {currentUser.firstName} {currentUser.lastName}</p>
          </div>
          <div className="card-item">
            <label>Account Email: </label>
            <p> {currentUser.email}</p>
          </div>
        </div>

      </div>
    </div>   
  )
}

AccountSettings.propTypes = {
  currentUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  })
}

export default AccountSettings