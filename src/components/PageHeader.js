import React from 'react'

export const PageHeader = ({ pageTitle }) => {
  return (
    <div className="page-header--wrapper">
      <div className="page-header">
        <div className="page-header--title">
          <h1 className="page-title">{pageTitle}</h1>
        </div>
        <div className="page-header--nav">
          <button className="button-primary button-inline">Quick Action</button>
        </div>
      </div> 
    </div>
  )
}
