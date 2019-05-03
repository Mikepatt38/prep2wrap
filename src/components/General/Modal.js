import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '../../img/icon-close.svg'
 
class Modal extends Component {
  state = {
    formSuccess: false
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      formSuccess: nextProps.modalSuccess
    })
  }

  render() {
    const { active, title, children, setModal } = this.props

    return (
      <div className={active ? 'modalBg modal-open' : 'modalBg'}>
        <div className="modal">
          <div className="modal-header">
            <h2>{title}</h2>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string,
  toggleModal: PropTypes.func,
  children: PropTypes.object
}

export default Modal

// <a 
// role="button"
// onClick={() => setModal(false, '', null)}
// >
// <img src={CloseIcon} />
// </a>