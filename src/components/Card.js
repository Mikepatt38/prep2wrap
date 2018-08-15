import React from 'react'
import PropTypes from 'prop-types'

export const Card = ({ children, cardText }) => {
  return (
    <div className="card">
      <div className="card-header">
        <p>{cardText}</p>
      </div>
      {children}
    </div>
  )
}

Card.propTypes = {
  cardText: PropTypes.string
}