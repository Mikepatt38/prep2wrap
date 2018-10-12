import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '../img/icon-close.svg'
 
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
      <div className={ active ? 'modal modal-open' : 'modal'}>
        <div id="linktotop"></div>
        <div className="modal-dialogue">
          <div className="modal-content">
            { this.state.formSuccess &&  
              <div className="alert success active alert-modal">
                <p>Success!</p>
              </div>
            } 
            <div className="modal-header">
              <h3>{title}</h3>
              <a 
                role="button"
                onClick={() => setModal(false, '', null)}
              >
                <img src={CloseIcon} />
              </a>
            </div>
            <div className="modal-body">
              {children}
            </div>
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