import React, { Component } from 'react'

class UserProfileModal extends Component {
  state = {
    active: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.userModalActive
    })
  }

  render() {
    const { user } = this.props
    return (
      <div className={ this.props.userModalActive ? 'modal modal-open' : 'modal'}>
        <div className="modal-dialogue user-modal">
          <div className="modal-content">
            <div className="modal-header">
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default UserProfileModal