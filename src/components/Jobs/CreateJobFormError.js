import React from 'react'

export const CreateJobFormError = ({title, subtitle, errorMessage}) => (
  <div className="card">
    <div className="card-header">
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
    <div className="card-body">
      <p>{errorMessage}</p>
    </div>
    <div className="card-footer">
    
    </div>
  </div>
) 