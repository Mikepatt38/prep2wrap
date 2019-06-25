import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import CloseIcon from '../../img/icon-close.svg'

export function GlobalAlert(props){
  return (
    props.active ?
    ReactDOM.createPortal(
      <div className="global-alert active">
        <Link to="/account-settings">
          <p><b>ALERT:</b> &nbsp;Complete your profile to send and receive jobs. Click to go to settings to update.</p>
          <span onClick={ () => props.onSetAlert(false, '', '') }><img src={CloseIcon} alt="Close Icon" /></span>
        </Link>
      </div>, document.body
    ) : null
  )
}