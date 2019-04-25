import React, { Component, Fragment } from 'react'
import CloseIcon from '../../img/icon-close.svg'

class JobsModal extends Component {
  state = {
    active: false,
  }

  component

  render() {
    const { jobModalData, jobModalActive } = this.props
    return (
      <div className={ this.props.jobModalActive ? 'modalBg modal-open' : 'modalBg'}>
        <div className="modal">
          <div className="modal-header">
            <h2>Job Overview</h2>
            <img src={CloseIcon} 
              alt="Close icon for modal" 
              role="button"
              onClick={() => this.props.closeModal(false)}
            />
          </div>
          { 
            jobModalActive &&
            <React.Fragment>
              <div className="modal-body">
                <label>Job Name</label>
                <p>{jobModalData.jobName}</p> 
              </div>

              <div className="modal-body">
                <label>Description</label>
                <p>{jobModalData.jobDescription}</p> 
              </div>
            </React.Fragment>
          }
        </div>
      </div>
    )
  }
}

export default JobsModal