import React, { Component, Fragment } from 'react'
import CloseIcon from '../../img/icon-close.svg'

class JobsModal extends Component {
  state = {
    active: false,
  }

  render() {
    const { jobData } = this.props
    return (
      <div className={ this.props.jobModalActive ? 'modalBg modal-open' : 'modalBg'}>
        <div className="modal">
          <div className="modal-header">
            <h2>Job Name</h2>
            <img src={CloseIcon} 
              alt="Close icon for modal" 
              role="button"
              onClick={() => this.props.closeModal(false)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default JobsModal