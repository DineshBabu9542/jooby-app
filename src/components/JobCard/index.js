import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {eachJobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = eachJobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="list-items-container">
        <div>
          <div>
            <div className="company-title-star-icon">
              <img
                src={companyLogoUrl}
                alt="company logo"
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
              <h1 className="company-title">Description</h1>
              <p className="company-employment-type">{jobDescription}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
