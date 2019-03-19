import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export const GlobalAlert = ({ active }) => (
  <Link to="/account-settings">
    <div className={active ? 'global-alert active' : 'global-alert'}>
      <p><b>ALERT:</b> Complete your profile to send and receive jobs. Click to go to settings to update.</p>
    </div>
  </Link>
)