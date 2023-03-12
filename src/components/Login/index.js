import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    submitError: false,
  }

  onChangeUserName = event =>
    this.setState({
      username: event.target.value,
    })

  onChangePassword = event =>
    this.setState({
      password: event.target.value,
    })

  onResponseSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onResponseFailure = errorMsg => {
    this.setState({submitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const apiLoginUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiLoginUrl, options)

    const data = await response.json()

    if (response.ok === true) {
      this.onResponseSuccess(data.jwt_token)
    } else {
      this.onResponseFailure(data.error_msg)
    }

    console.log(data)
  }

  render() {
    const {password, username, errorMsg, submitError} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="container">
        <div className="login-container">
          <div className="logo-img-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo-img"
            />
          </div>
          <form onSubmit={this.onSubmitForm}>
            <div className="password-container">
              <label className="user-name" htmlFor="username">
                USERNAME
              </label>
              <br />
              <div className="input-name-container">
                <input
                  className="input"
                  type="text"
                  id="username"
                  placeholder="username"
                  value={username}
                  onChange={this.onChangeUserName}
                />
              </div>
            </div>
            <div className="password-container">
              <label className="user-name" htmlFor="password">
                PASSWORD
              </label>
              <br />
              <div className="input-password-container">
                <input
                  type="password"
                  id="password"
                  className="input"
                  placeholder="Password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
            </div>
            <div>
              <button className="submit-btn" type="submit">
                Login
              </button>
            </div>
          </form>
          {submitError && <p className="error-msg">*{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default Login
