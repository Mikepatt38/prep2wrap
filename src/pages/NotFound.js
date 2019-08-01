import React from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/General/EmptyState'
import NoResultsIllustration from '../img/illustrations/no-results.svg'

export const NotFound = () => (
  <div className="app-page">
    <div className="workspace">
      <div className="workspace-desktop">
        <div className="workspace-tab-list">
          <Link to="/" className="link">Dashboard</Link>
          <Link to="/availability" className="link">Availability</Link>
          <Link to="/jobs" className="link">Jobs</Link>
          <Link to="/crew" className="link">Crew</Link>
          <Link to="/account-settings">Settings</Link>
        </div>
      </div>
    </div>
    <div className="app-page-body">
      <div className="app-page-section">
        <EmptyState
          imgSrc={NoResultsIllustration}
          imgAlt="Page Not Found Illustration"
          title="That page does not exist."
          text="The page you are looking for does not exist, use the navbar to navigate to a known section of the application."
        />
      </div>
    </div>
  </div>
)