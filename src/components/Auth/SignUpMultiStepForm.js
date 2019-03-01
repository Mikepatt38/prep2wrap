import React, { Component } from 'react'
import { SignUpMultiStepFormOne } from './SignUpMultiStepFormStepOne'
import { SignUpMultiStepFormStepTwo } from './SignUpMultiStepFormStepTwo'
import CreateIllustration from '../../img/illustration-create.svg'
import SearchIllustration from '../../img/illustration-search.svg'
import SettingsIllustration from '../../img/illustration-settings.svg'

export class SignUpMultiStepForm extends Component {
  state = {
    formStep: 2
  }

  nextStep = () => {
    const { formStep } = this.state
    this.setState({
      formStep : formStep + 1
    })
  }

  prevStep = () => {
    const { formStep } = this.state
    this.setState({
      formStep : formStep - 1
    })
  }

  errorStep = () => {
    const { formStep } = this.state
    this.setState({
      formStep: 'error'
    })
  }

  errorAndStop = (e) => {
    e.preventDefault()
    this.setState({
      formStep: 'error'
    })
  }

  saveAndContinue = () => {
    this.setState({
      loading: false
    })
    this.nextStep()
  }

  renderView = (formStep) => {
    switch(formStep) {
      case 0:
        return (
          <SignUpMultiStepFormOne
            signUpUser={this.props.signUpUser}
            saveAndContinue={this.saveAndContinue}
            signUpUserAndContinue={this.signUpUserAndContinue}
            errorAndStop={this.errorAndStop}
          />
        )
        break

      case 1:
        return (
          <SignUpMultiStepFormStepTwo
            setUserProfileAndContinue={this.setUserProfileAndContinue}
            setUserProfile={this.props.setUserProfile}
            saveAndContinue={this.saveAndContinue}
            errorAndStop={this.errorAndStop}
            currentUser={this.props.currentUser}
          />
        )
        break
      
      case 2:
        return (
        <QuickActions />
        )
        break

      case 'error':
        return <p>Error....</p>
    }
  }

  render(){
    return (
      <React.Fragment>
        {this.renderView(this.state.formStep)}
      </React.Fragment>
    )
  }
}

// const SignUpFormNav = ({ formStep, loading }) => (
//   <nav className="signUpFormNav">
//     <ul className="steps-nav">
//       <li className={formStep === 0 ? 'active' : ''}>
//         <div>
//           <p className="stepTitle">Step 1</p>
//           <p className="stepName">Create your account</p>
//         </div>
//       </li>
//       <li className={formStep === 1 ? 'active' : ''}>
//         <div>
//           <p className="stepTitle">Step 2</p>
//           <p className="stepName">Your profile information</p>
//         </div>
//       </li>
//       <li className={formStep === 2 ? 'active' : ''}>
//         <div>
//           <p className="stepTitle">Step 3</p>
//           <p className="stepName">Getting Started</p>
//         </div>
//       </li>
//     </ul>
//     <fieldset className={`steps-nav-progress step${formStep}`} disabled={loading} aria-busy={loading}></fieldset>
//   </nav> 
// )

const QuickActions = () => (
  <div className="auth-card auth-card-large">
    <div className="auth-card-header">
      <h3 className="signUpFormTitle">Setp 3/3: Congrats! Get started using your account today.</h3>
      <p className="signUpFormText">Get started using your account today by clicking one of the quick actions or going straight to your user dashboard.</p>  
    </div>
    <div className="auth-card-body">
      <div className="quickAction-container">
        <div className="quickAction">
          <a href="http://localhost:3000/dashboard">
            <div className="illustration">
              <img src={CreateIllustration} alt="Create a job illustration" />
            </div>
            <div className="content">
              <h3>Create your first job.</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
          </a>
        </div>

        <div className="quickAction">
          <div className="illustration">
            <img src={SearchIllustration} alt="Search users illustration" />
          </div>
          <div className="content">
            <h3>Search for other users.</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </div>
        </div>

        <div className="quickAction">
          <a href="http://localhost:3000/dashboard">
            <div className="illustration">
              <img src={SettingsIllustration} alt="Account settings illustration" />
            </div>
            <div className="content">
              <h3>Head to your user dashboard.</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
)