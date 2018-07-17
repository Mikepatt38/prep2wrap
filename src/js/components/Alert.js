import React, { Component } from 'react'
import { connect } from 'react-redux'

class Notification extends Component {
  
  render() {
    const { active, alertText, alertType } = this.props
    return (
      <div className={active ? 'alert active ' + `${alertType}` : 'alert'}>
        <div className="alert-text">
          <p>{alertText}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  active: state.sessionState.alertActive,
  alertText: state.sessionState.alertText,
  alertType: state.sessionState.alertType
})

export default connect(mapStateToProps)(Notification)