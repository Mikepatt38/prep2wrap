import React, { Component } from 'react'
import { connect } from 'react-redux'

class Notification extends Component {
  // state = {
  //   alertClass: alertType === 'success' ? 'alert-success' : 'alert-fail'
  // }
  
  render() {
    const { active, alertText, alertType } = this.props
    return (
      <div className={active ? 'alert active' : 'alert'}>
        <p>{alertText}</p>
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