import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

export function GlobalAlert(props){
  return (
    props.active ?
    ReactDOM.createPortal(
      <div className="global-alert active">
        <Link to="/account-settings">
          <b>ALERT:</b> &nbsp;Click to update and complete your profile to send and receive jobs.
        </Link>
      </div>, document.body
    ) : null
  )
}