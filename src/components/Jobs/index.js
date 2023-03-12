import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BiSearch} from 'react-icons/bi'

import FilterGroup from '../FilterGroup'

import Header from '../Header'

import ProfileDetails from '../ProfileDetails'

import './index.css'
import JobCard from '../JobCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    searchInput: '',
    minSalary: 0,
    employment: [],
    jobsList: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {apiStatus, minSalary, employment, searchInput} = this.state

    this.setState({
      apiStatus: apiStatusConstant.progress,
    })

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employment.join()}&minimum_package=${minSalary}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const upDateData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: upDateData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderInProgress = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {jobsList} = this.state

    const renderJobsList = jobsList.length > 0

    return renderJobsList ? (
      <div>
        <ul className="jobs-un-order-container">
          {jobsList.map(eachJob => (
            <JobCard key={eachJob.id} eachJobDetails={eachJob} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
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
          <button
            onClick={this.getJobs}
            data-testid="button"
            type="button"
            className="retry-btn"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  )

  renderJobsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccess()
      case apiStatusConstant.failure:
        return this.renderFailure()

      case apiStatusConstant.progress:
        return this.renderInProgress()

      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  keyDownSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  salaryChange = salary => {
    this.setState({minSalary: salary}, this.getJobs)
  }

  employListChange = type => {
    console.log(type)
    this.setState(
      prev => ({employment: [...prev.employment, type]}),
      this.getJobs,
    )
  }

  render() {
    return (
      <div>
        <Header />
        <div className="bg-container-jobs">
          <div className="search-sm-container">
            <div className="input-container">
              <input
                onChange={this.onChangeSearchInput}
                placeholder="Search"
                type="search"
                className="input-ele"
                onKeyDown={this.keyDownSearchInput}
              />
              <button
                onClick={this.getJobs}
                type="button"
                className="search-icon-btn"
                data-testid="searchButton"
              >
                <BiSearch className="bi-search-icon" />
              </button>
            </div>
          </div>
          <div className="profile-filter-container">
            <div>
              <ProfileDetails />
            </div>
            <hr className="hr-line" />
            <FilterGroup
              employmentList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              employListChange={this.employListChange}
              salaryChange={this.salaryChange}
            />
          </div>
          <div className="search-lg-success-container">
            <div className="search-lg-container">
              <div className="input-container">
                <input
                  onKeyDown={this.keyDownSearchInput}
                  placeholder="Search"
                  type="search"
                  className="input-ele"
                  onChange={this.onChangeSearchInput}
                />
                <button
                  onClick={this.getJobs}
                  type="button"
                  className="search-icon-btn"
                  data-testid="searchButton"
                >
                  <BiSearch className="bi-search-icon" />
                </button>
              </div>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
