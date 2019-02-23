import React, { Component } from 'react'
import JobOverviewTable from '../components/Jobs/JobOverviewTable'

export const JobOverview = (props) => {
  return (
    <JobOverviewTable
      currentUser={props.currentUser}
      getJobOverviewData={props.getJobOverviewData}
      acceptJobInvitation={props.acceptJobInvitation}
      denyJobInvitation={props.denyJobInvitation}
      createUserAcceptedJob={props.createUserAcceptedJob}
      deletedCreatedJob={props.deletedCreatedJob}
      history={props.history}
    />
  )
}