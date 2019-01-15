import React, { Component } from 'react'
import JobOverviewTable from '../components/JobOverviewTable'

export const JobOverview = (props) => {
  return (
    <JobOverviewTable
      currentUser={props.currentUser}
      getJobOverviewData={props.getJobOverviewData}
    />
  )
}