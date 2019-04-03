import React, { Component } from 'react'
import JobOverviewTable from '../components/Jobs/JobOverviewTable'

export const JobOverview = (props) => {
  return (
    <div className="app-page">
      <div className="app-page-title">
        <h1>Job Overview</h1>
      </div>
      <div className="app-page-section">
        <JobOverviewTable
          currentUser={props.currentUser}
          getJobOverviewData={props.getJobOverviewData}
          acceptJobInvitation={props.acceptJobInvitation}
          denyJobInvitation={props.denyJobInvitation}
          createUserAcceptedJob={props.createUserAcceptedJob}
          deletedCreatedJob={props.deletedCreatedJob}
          createReduxJob={props.createReduxJob}
          history={props.history}
        />
      </div>
    </div>
  )
}