import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import CloseIcon from '../../img/icon-close.svg'

export function Alert(props){
  return (
    props.active ?
    ReactDOM.createPortal(
      <React.Fragment>
        <div className={'alert active ' + `${props.alertType}`} onClick={ () => props.onSetAlert(false, '', '') }>
          <p>{props.alertText}</p>
          <span onClick={ () => props.onSetAlert(false, '', '') }><img src={CloseIcon} alt="Close Icon" /></span>
        </div>
      </React.Fragment>, document.body
    ) : null
  )
}

Alert.propTypes = {
  active: PropTypes.bool.isRequired,
  alertText: PropTypes.string.isRequired,
  alertType: PropTypes.string.isRequired,
}

