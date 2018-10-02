import React from 'react'
import PropTypes from 'prop-types'

export const Alert = ({ active, alertText, alertType, onSetAlert }) => {
  return (
    <div className={active ? 'alert active ' + `${alertType}` : 'alert'} onClick={ () => onSetAlert(false, '', '') }>
      <p></p>
    </div>
  )
}

Alert.propTypes = {
  active: PropTypes.bool.isRequired,
  alertText: PropTypes.string.isRequired,
  alertType: PropTypes.string.isRequired,
  onSetAlert: PropTypes.func
}