import React, { Component } from 'react'
import logo from '../img/logo.svg'
import { withRouter } from 'react-router-dom'
import { Login } from '../components/Login'
import { SignUp } from '../components/SignUp'
import { PasswordReset } from '../components/PasswordReset'

class UserAuth extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordOne: '',
    passwordTwo: '',
    authStatus: '',
    error: null
  }

  componentWillMount = () => {
    this.props.location.pathname === '/login' ? this.setState({ authStatus: 'login'}) : this.props.location.pathname === '/signup' ? this.setState({ authStatus: 'signup'}) : ''
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      authStatus: nextProps.location.pathname === '/login' ? 'login' : 'signup'
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { history, signUserIn, signUpUser, resetPassword} = this.props
    return (
      <div className="page-background">
        <div className="page-background-skewed"></div>
        <div className="logo">
          <img src={logo} alt="The Calltime Login Page Logo" />
        </div>
        <div className="container container--form">
          <div className="form-wrap">
            {this.state.authStatus === 'login'
              ? <Login state={this.state} handleChange={this.handleChange}  history={history} signUserIn={signUserIn} />
              : this.state.authStatus === 'signup' 
                ? <SignUp state={this.state} handleChange={this.handleChange}  history={history} signUpUser={signUpUser} />
                : <PasswordReset email={this.state.email} error={this.state.error} handleChange={this.handleChange} resetPassword={resetPassword} />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserAuth)