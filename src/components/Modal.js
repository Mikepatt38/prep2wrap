import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '../img/icon-close.svg'

export const Modal = ({ active, title, children, setModal }) => {
  return (
    <div className={ active ? 'modal modal-open' : 'modal'}>
      <div className="modal-dialouge">
        <div className="modal-content">
          <div className="modal-header">
            <a 
              role="button"
              onClick={() => setModal(false, '', null)}
            >
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
  children: PropTypes.object
}