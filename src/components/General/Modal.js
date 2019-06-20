import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

function Modal(props){
  return (
    props.active ?
    ReactDOM.createPortal(
      <React.Fragment>
        <div className="modalBg modal-open">
          <div className="modal">
            <div className="modal-header">
              <h2>{props.title}</h2>
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