import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import JobEachItemDetails from '../JobEachItemDetails'
import SimilarJobData from '../SimilarJobData'
import Header from '../Header'

import './index.css'

const apiStatusConstant = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    simlerJobList: [],
    jobsList: {},
  }

  componentDidMount() {
    this.getRenderItems()
  }

  getJobDetailsItems = jobDetails => ({
    companyLogoUrl: jobDetails.company_logo_url,
    companyWebsiteUrl: jobDetails.company_website_url,
    employmentType: jobDetails.employment_type,
    id: jobDetails.id,
    jobDescription: jobDetails.job_description,
    lifeAtCompany: {
      description: jobDetails.life_at_company.description,
      imageUrl: jobDetails.life_at_company.image_url,
    },
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,

    rating: jobDetails.rating,
    skills: jobDetails.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getSimilerData = eachData => ({
    companyLogoUrl: eachData.company_logo_url,
    employmentType: eachData.employment_type,
    id: eachData.id,
    jobDescription: eachData.job_description,
    location: eachData.location,
    rating: eachData.rating,
    title: eachData.title,
  })

  getRenderItems = async () => {
    this.setState({
      apiStatus: apiStatusConstant.progress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()

      console.log(data)

      const upDateData = this.getJobDetailsItems(data.job_details)
      const similerData = data.similar_jobs.map(eachData =>
        this.getSimilerData(eachData),
      )
      console.log(upDateData)
      console.log(similerData)
      this.setState({
        jobsList: upDateData,
        simlerJobList: similerData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderSuccessJobItemDetails = () => {
    const {jobsList, simlerJobList} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobsList
    console.log(jobsList)

    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-items-objects-container">
        <div className="list-items-container-value">
          <div>
            <div className="company-title-star-icon">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo-img"
              />
              <div>
                <h1 className="company-title">{title}</h1>
                <div className="rating-container">
                  <AiFillStar className="star-img" />
                  <p className="company-rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="all-container">
              <div className="location-img-con">
                <MdLocationOn className="go-location-img" />
                <p className="company-location">{location}</p>
              </div>
              <div className="location-case-package-employ-con">
                <div className="location-cas-employ-type-con">
                  <BsFillBriefcaseFill className="go-location-img" />
                  <p className="company-employment-type">{employmentType}</p>
                </div>
                <div className="location-employ-type-con">
                  <p className="company-employment-type">{packagePerAnnum}</p>
                </div>
              </div>
            </div>
            <hr className="hr-line" />
            <div>
              <div className="name-link-anchor-container">
                <h1 className="company-title">Description</h1>
                <div className="anchor-con">
                  <a href={companyWebsiteUrl} className="visit-heading">
                    Visit
                  </a>
                  <BiLinkExternal className="visit-link-icon" />
                </div>
              </div>
              <p className="company-employment-type">{jobDescription}</p>
            </div>
          </div>

          <div>
            <h1 className="skills-heading">Skills</h1>
            <ul className="un-order-skills-container">
              {skills.map(eachSkill => (
                <JobEachItemDetails
                  key={eachSkill.name}
                  skillsDetails={eachSkill}
                />
              ))}
            </ul>
          </div>
          <h1 className="lif-at-company-heading">Life at Company</h1>

          <div className="life-at-company-img-container">
            <p className="lif-at-company-paragraph">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="lif-at-company-img"
            />
          </div>
        </div>
        <div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <div>
            <ul className="similar-jobs-un-order-container">
              {simlerJobList.map(eachSimilar => (
                <SimilarJobData
                  key={eachSimilar.id}
                  similarDataDetails={eachSimilar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderFailureJobItemDetails = () => (
    <div className="job-items-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <div>
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-paragraph">
          We cannot seem to find the page you are looking for
        </p>
        <div className="retry-btn-container">
          <button onClick={this.jobsList} type="button" className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    </div>
  )

  renderProgressJobItemDetails = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderDetails = () => {
    const {apiStatus} = this.state

    console.log(apiStatus)

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessJobItemDetails()
      case apiStatusConstant.failure:
        return this.renderFailureJobItemDetails()
      case apiStatusConstant.progress:
        return this.renderProgressJobItemDetails()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.renderDetails()}</div>
      </div>
    )
  }
}

export default JobItemDetails
