import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => (
  <div className="app-page">
    <div className="workspace">
      <div className="workspace-desktop">
        <div className="workspace-tab-list">
          <Link to="/" className="link">Dashboard</Link>
          <Link to="/jobs" className="link">Jobs</Link>
          <Link to="/crew" className="link">Crew</Link>
          <Link to="/availability" className="link">Availability</Link>
          <Link to="/account-settings" className="active">Settings</Link>
        </div>
      </div>
    </div>
    <div className="app-page-body">
      <div className="app-page-section">
        <p>Looks like that page doesn't exist</p>
      </div>
    </div>
  </div>
)