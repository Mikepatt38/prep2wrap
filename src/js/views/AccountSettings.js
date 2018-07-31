import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withAuthorization from '../components/withAuthorization'
import GeneralInfoForm from '../components/GeneralInfoForm'
import ProfileSettingsForm from '../components/ProfileSettingsForm'
import { setAccountView } from '../../actions/accounts'

class AccountSettings extends Component {

  renderView = (accountView) => {
    if(accountView === 'general') {
      return <GeneralInfoForm />
    }
    else if(accountView === 'profile') {
      return <ProfileSettingsForm />
    }
    else {
      return <GeneralInfoForm />
    }
  }  

  render() {
    const { setAccountView, accountView } = this.props
    return (
      <div className="container">
        <div className="account-settings-container">
          <h1 className="page-title">Account Settings</h1>
          <div className="grid-account">
            <div className="grid-account-nav">
              <ul>
                <li className={accountView === 'general' ? 'active' : ''} onClick={() => setAccountView('general')}>General</li>
                <li className={accountView === 'profile' ? 'active' : ''} onClick={() => setAccountView('profile')}>Profile</li>
                <li>Billing</li>
              </ul>
            </div>
            {this.renderView(accountView)}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  accountView: state.accountState.accountView,
})

const mapDispatchToProps = (dispatch) => ({
  setAccountView: (view) => dispatch(setAccountView(view))
})

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSettings)