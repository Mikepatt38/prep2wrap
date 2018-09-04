import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '../img/icon-close.svg'

export const Modal = ({ title, toggleModal, children }) => {
  return (
    <div className="modal">
      <div className="modal-dialouge">
        <div className="modal-content">
          <div className="modal-header">
            <a 
              role="button"
              onClick={toggleModal}>
              <img src={CloseIcon} />
            </a>
            <h3>{title}</h3>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string,
  toggleModal: PropTypes.func,
  children:PropTypes.obj
}