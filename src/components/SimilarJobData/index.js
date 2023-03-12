import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobData = props => {
  const {similarDataDetails} = props
  const {
    companyLogoUrl,
    employmentType,

    id,
    jobDescription,

    location,

    rating,

    title,
  } = similarDataDetails
  return (
    <li className="similar-job-list-container">
      <div>
        <div>
          <div className="company-title-star-icon">
            <img
              src={companyLogoUrl}
              alt="similar job company logo"
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
          <div>
            <h1 className="company-title">Description</h1>
            <p className="company-employment-type">{jobDescription}</p>
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
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobData
