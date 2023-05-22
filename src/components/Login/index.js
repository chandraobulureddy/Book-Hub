import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isSuccess: false,
  }

  onSuccessApi = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureApi = errorMsg => {
    this.setState({errorMsg, isSuccess: true})
  }

  submitBtn = async event => {
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
      this.onSuccessApi(data.jwt_token)
    } else {
      this.onFailureApi(data.error_msg)
    }
  }

  username = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  userLogin = () => {
    const {username} = this.state
    return (
      <div>
        <label className="login-user-label" htmlFor="username">
          Username*
        </label>
        <br />
        <input
          onChange={this.username}
          className="login-user-input"
          type="text"
          placeholder="name"
          id="username"
          value={username}
        />
      </div>
    )
  }

  userPassword = () => {
    const {password} = this.state
    return (
      <div>
        <label className="login-user-label" htmlFor="password">
          Password*
        </label>
        <br />
        <input
          onChange={this.password}
          className="login-user-password"
          type="password"
          placeholder="Password"
          id="password"
          value={password}
        />
      </div>
    )
  }

  render() {
    const {errorMsg, isSuccess} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dzqwhkjng/image/upload/v1670827743/Rectangle_1467_evp7rm.jpg"
          alt="website login"
          className="login-banner-img"
        />

        <img
          src="https://res.cloudinary.com/dzqwhkjng/image/upload/v1671014743/Ellipse_99_pgh6ht.png"
          alt="website login"
          className="login-banner-img-mobile"
        />

        <div className="login-details-div">
          <div className="login-details-container">
            <form onSubmit={this.submitBtn}>
              <div className="login-website-logo">
                <img
                  src="https://res.cloudinary.com/dzqwhkjng/image/upload/v1670828407/Group_7731_s1y28g.png"
                  alt="login website logo"
                  className="login-img-setup"
                />
              </div>
              <div>
                {this.userLogin()}
                {this.userPassword()}
                {isSuccess && <p className="login-error-msg">{errorMsg}</p>}
              </div>
              <div>
                <button className="login-button" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
