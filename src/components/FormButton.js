import React from 'react'
import PropTypes from 'prop-types'

export const FormButton = ( { className, onClick, buttonText } ) => {
  return (
    <button 
      type="submit"
      className={className}
      onClick={onClick}
    > 
      {buttonText} 
    </button>
  )
} 

FormButton.propTypes = {
  className: PropTypes.string,
  buttonText: PropTypes.string,
  onCick: PropTypes.func
}