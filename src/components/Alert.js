import React from 'react'
import PropTypes from 'prop-types'

export const Alert = ({ active, alertText, alertType, onSetAlert }) => {
  return (
    <div className={active ? 'alert active ' + `${alertType}` : 'alert'}>
      <div className="alert-info">
        <div className="alert-text">
          <p>{alertText}</p>
        </div>
        <div className="alert-close" onClick={ () => onSetAlert(false, '', '') }>
          <p>X</p>
        </div>
      </div>
    </div>
  )
}

Alert.propTypes = {
  active: PropTypes.bool.isRequired,
  alertText: PropTypes.string.isRequired,
  alertType: PropTypes.string.isRequired
}