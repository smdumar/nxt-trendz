import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  loginSuccess = (jwtToken) => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires:1})
    history.replace('/')
  }

  formSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.setState({showSubmitError: true, errorMsg: data.error_msg})
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if(jwtToken !== undefined){
      return <Redirect to='/'/>
    }
    const {userName, password, showSubmitError, errorMsg} = this.state

    return (
      <div className="login-page-container">
        <form className="form-container" onSubmit={this.formSubmit}>
          <div className="website-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>

          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
              alt="website login"
              className="login-img"
            />
          </div>

          <div className="form">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
              className="website-logo-desktop"
            />

            <div className="input-container">
              <label htmlFor="userName-input" className="label">
                USERNAME
              </label>
              <input
                type="text"
                id="userName-input"
                onChange={this.onChangeUserName}
                value={userName}
                placeholder="rahul"
              />
            </div>

            <div>
              <label htmlFor="password-input" className="label">
                PASSWORD
              </label>
              <input
                type="password"
                id="password-input"
                onChange={this.onChangePassword}
                value={password}
                placeholder="rahul@2021"
              />
            </div>
            <div>
              <button type="submit" className="submit-button">
                Login
              </button>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default LoginForm
