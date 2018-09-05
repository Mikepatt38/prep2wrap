import React from 'react'
import PropTypes from 'prop-types'
import EditIcon from '../img/icon-edit.svg'

export const Card = ({ children, cardTitle, cardText }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{cardTitle}</h2>
        <p>{cardText}</p>
      </div>
      {children}
    </div>
  )
}

Card.propTypes = {
  cardTitle: PropTypes.string,
  cardText: PropTypes.string,
}