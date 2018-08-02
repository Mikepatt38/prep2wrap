import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { signUserIn } from '../../actions/users'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: null
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  onSubmit = (e) => {
    const { email, password } = this.state
    const { history } = this.props
    e.preventDefault()
    this.props.signUserIn(email, password, history)
    this.setState(() => ({
      email: '',
      password: '',
      error: null
    }))
  }

  render() {
    const { email, password, error } = this.state

    const isValid = password === '' || email === '' 

    return (
      <React.Fragment>
        <div className="form-wrap">
          <form onSubmit={this.onSubmit}>
            <legend>Glad to see you again!</legend>
            <div className="form-link">
              New To The Calltime? &nbsp;
              <Link to="/signup">
                <span>Sign Up</span>
              </Link>
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                name="email"
                onChange={this.handleChange}
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                name="password"
                onChange={this.handleChange}
                type="password"
              />
            </div>
            <button className="btn-form" disabled={isValid} type="submit">
              Login
            </button>

            {error && <p>{error.message}</p>}
          </form>
          <div className="form-footer">
            <div>
              Forgot Password? &nbsp;
              <Link to="/password-reset">
                <span>Reset Your Password</span>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
})

const mapDispatchToProps = (dispatch) => {
  return {
    signUserIn: bindActionCreators(signUserIn, dispatch)
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(LoginForm)