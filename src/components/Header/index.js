import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="app-container">
        <div className="logo-img-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="site-logo-img"
            />
          </Link>
        </div>
        <ul className="un-order-lists">
          <li>
            <Link to="/" className="link-fill ">
              <AiFillHome className="fill-home" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link-fill">
              <BsFillBriefcaseFill className="fill-home" />
            </Link>
          </li>
          <li>
            <button type="button" className="log-out-btn-sm">
              <FiLogOut className="fill-home" onClick={onClickLogout} />
            </button>
          </li>
        </ul>
        <div className="ai-fill-home-lg">
          <div className="home-job-container">
            <Link to="/" className="link-fill">
              <p className="names-paragraph">Home</p>
            </Link>
            <Link to="/jobs" className="link-fill">
              <p className="names-paragraph">Jobs</p>
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="log-out-btn-lg"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
