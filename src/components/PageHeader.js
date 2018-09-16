import React from 'react'
import HelpIcon from '../img/icon-info.svg'
import NotificationIcon from '../img/icon-alert.svg'
import DownArrowIcon from '../img/icon-downarr.svg'

export const PageHeader = ({ pageTitle }) => {
  return (
    <div className="page-header--wrapper">
      <div className="page-header">
        <div className="page-header--title">
          <h1 className="page-title">{pageTitle}</h1>
        </div>
        <div className="page-header--nav">
          <img src={HelpIcon} alt="Help Icon" />
          <img src={NotificationIcon} alt="Notification Icon" />
        </div>
      </div> 
    </div>
  )
}
