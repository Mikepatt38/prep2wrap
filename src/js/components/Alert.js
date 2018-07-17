import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/components'

class Notification extends Component {
  
  render() {
    const { active, alertText, alertType } = this.props
    return (
      <div className={active ? 'alert active ' + `${alertType}` : 'alert'}>
        <div className="alert-info">
          <div className="alert-text">
            <p>{alertText}</p>
          </div>
          <div className="alert-close" onClick={ () => this.props.onSetAlert(false, '', '') }>
            <p>X</p>
          </div>
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

const mapDispatchToProps = (dispatch) => ({
  onSetAlert: (alertActive, alertType, text) => dispatch(setAlert(alertActive, alertType, text))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)