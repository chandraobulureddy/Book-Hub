import './index.css'

import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiMenu} from 'react-icons/fi'
import {RiCloseCircleFill} from 'react-icons/ri'

class Header extends Component {
  state = {
    isNavShowing: false,
  }

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  navToggleBtn = () => {
    this.setState(prevState => ({isNavShowing: !prevState.isNavShowing}))
  }

  navCloseBtn = () => {
    this.setState({isNavShowing: false})
  }

  render() {
    const {isNavShowing} = this.state

    return (
      <div className="header-container">
        <div className="header-sub-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dzqwhkjng/image/upload/v1670828407/Group_7731_s1y28g.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
          <div className="header-details-container">
            <ul className="header-ul">
              <Link className="link" to="/">
                <li className="header-li">Home</li>
              </Link>
              <Link className="link" to="/shelf">
                <li className="header-li">Bookshelves</li>
              </Link>
              <Link className="link" to="/favorites">
                <li className="header-li">MyFavorites</li>
              </Link>
            </ul>
            <div>
              <button
                onClick={this.logout}
                className="logout-button"
                type="button"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="menu-container">
            <button
              onClick={this.navToggleBtn}
              className="menu-button"
              type="button"
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>

        {isNavShowing && (
          <div className="menu-details-div">
            <ul className="menu-details-ul">
              <Link to="/" className="link">
                <li className="menu-details-li">
                  <h1 className="menu-details-heading ">Home</h1>
                </li>
              </Link>
              <Link to="/shelf" className="link">
                <li className="menu-details-li">
                  <h1 className="menu-details-heading">Bookshelves</h1>
                </li>
              </Link>
              <Link className="link" to="/favorites">
                <h1 className="menu-details-heading">MyFavorites</h1>
              </Link>
              <div>
                <button
                  className="logout-button-mobile"
                  onClick={this.logout}
                  type="button"
                >
                  Logout
                </button>
              </div>
              <div>
                <button
                  onClick={this.navCloseBtn}
                  className="close-button-mobile"
                  type="button"
                >
                  <RiCloseCircleFill size={20} />
                </button>
              </div>
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Header)
