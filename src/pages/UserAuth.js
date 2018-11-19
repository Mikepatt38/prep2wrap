import React, { Component } from 'react'
import logo from '../img/calltime-logo.png'
import { withRouter } from 'react-router-dom'
import { Login, LoginText, ForgotPassword  } from '../components/Login'
import { SignUp, SignUpText, MemberLink } from '../components/SignUp'
import { PasswordReset , PasswordResetText} from '../components/PasswordReset'

class UserAuth extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordOne: '',
    passwordTwo: '',
    authStatus: '',
    emailInputClass: '',
    emailPasswordClass: '',
    error: null
  }

  componentWillMount = () => {
    this.props.location.pathname === '/login' ? this.setState({ authStatus: 'login'}) : this.props.location.pathname === '/signup' ? this.setState({ authStatus: 'signup'}) : ''
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      authStatus: nextProps.location.pathname === '/login' ? 'login' : nextProps.location.pathname === '/login' ?  'signup' : 'password-reset'
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { authStatus } = this.state
    const { history, signUserIn, signUpUser, resetPassword} = this.props
    return (
      <div className="page-background">
        <div className="modal">
          <div className="modal-header">
            <img src={logo} alt="Calltime Logo" />
            { authStatus === 'login' && <LoginText /> }
            { authStatus === 'signup' && <SignUpText /> }
            { authStatus !== 'signup' && authStatus !== 'login' && <PasswordResetText /> }
          </div>
          <div className="modal-body">
            { authStatus === 'login' && <Login state={this.state} handleChange={this.handleChange}  history={history} signUserIn={signUserIn} /> }
            { authStatus === 'signup' && <SignUp state={this.state} handleChange={this.handleChange}  history={history} signUpUser={signUpUser} /> }
            { authStatus !== 'signup' && authStatus !== 'login' && <PasswordReset state={this.state} email={this.state.email} error={this.state.error} handleChange={this.handleChange} resetPassword={resetPassword} /> }
          </div>
          <div className="modal-footer">
            { authStatus === 'login' && <ForgotPassword /> }
            { authStatus === 'signup' && <MemberLink /> }
          </div>
        </div>
      </div>
    )
  }

  // render() {
  //   const { history, signUserIn, signUpUser, resetPassword} = this.props
  //   return (
  //     <div className="page-background">
  //       <div className="page-background-skewed"></div>
  //       <div className="logo">
  //         <img src={logo} alt="The Calltime Login Page Logo" />
  //       </div>
  //       <div className="container container--form">
  //         <div className="form-wrap">
  //           {this.state.authStatus === 'login'
  //             ? <Login state={this.state} handleChange={this.handleChange}  history={history} signUserIn={signUserIn} />
  //             : this.state.authStatus === 'signup' 
  //               ? <SignUp state={this.state} handleChange={this.handleChange}  history={history} signUpUser={signUpUser} />
  //               : <PasswordReset email={this.state.email} error={this.state.error} handleChange={this.handleChange} resetPassword={resetPassword} />
  //           }
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
}

export default withRouter(UserAuth)