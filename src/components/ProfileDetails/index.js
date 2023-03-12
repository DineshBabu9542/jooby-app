import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class ProfileDetails extends Component {
  state = {apiStatus: apiStatusConstant.initial, profileData: []}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({
      apiStatus: apiStatusConstant.progress,
    })

    const token = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },

      method: 'GET',
    }

    const response = await fetch(profileUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const updateData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileData: updateData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        data-testid="button"
        className="profile-failure-btn"
        onClick={this.getProfile}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {profileData} = this.state

    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="bg-img-container">
        <img className="profile-img" src={profileImageUrl} alt="profile" />
        <div>
          <h1 className="profile-name">{name}</h1>
          <p className="profile-bio">{shortBio}</p>
        </div>
      </div>
    )
  }

  renderProgressView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.progress:
        return this.renderProgressView()
      default:
        return null
    }
  }
}

export default ProfileDetails
