import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import CloseIcon from '../../img/icon-close.svg'


function Modal(props){
  return (
    props.active ?
    ReactDOM.createPortal(
      <React.Fragment>
        <div className="modalBg modal-open">
          <div className="modal">
            <div className="modal-header">
              <h2>{props.title}</h2>
              <button className="button button-transparent" onClick={() => props.close()}><img src={CloseIcon} alt="Close Modal Icon" /></button>
            </div>
            <div className="modal-body">
              {props.children}
            </div>
          </div>
        </div>
      </React.Fragment>, document.body
    ) : null

  )
}

Modal.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string,
  toggleModal: PropTypes.func,
  children: PropTypes.object
}

export default Modal