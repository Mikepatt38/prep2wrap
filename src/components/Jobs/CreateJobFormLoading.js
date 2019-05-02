import React from 'react'

export const CreateJobFormLoading = ({title, subtitle, message}) => (
  <div className="app-page">
    <div className="app-page-title">
      <h1>Job Overview / Error</h1>
    </div>
    <div className="app-page-section">
      <div className="card no-hover">
        <div className="card-header">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <div className="card-body">
          <p>{message}</p>
        </div>
        <div className="card-footer">
        
        </div>
      </div>
    </div>
  </div>
) 