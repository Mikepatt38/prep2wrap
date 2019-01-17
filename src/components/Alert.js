import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '../img/icon-close.svg'

export const Alert = ({ active, alertText, alertType, onSetAlert }) => {
  return (
    <div className={active ? 'alert active ' + `${alertType}` : 'alert'} onClick={ () => onSetAlert(false, '', '') }>
      <p>{alertText}</p>
      <span onClick={ () => onSetAlert(false, '', '')}><img src={CloseIcon} alt="Close Icon" /></span> 
    </div>
  )
}

Alert.propTypes = {
  active: PropTypes.bool.isRequired,
  alertText: PropTypes.string.isRequired,
  alertType: PropTypes.string.isRequired,
  onSetAlert: PropTypes.func
}

