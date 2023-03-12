import './index.css'

const JobEachItemDetails = props => {
  const {skillsDetails} = props
  const {imageUrl, name} = skillsDetails

  return (
    <li className="skill-list-item-container">
      <div className="skill-img-name-container">
        <img className="skill-img" src={imageUrl} alt={name} />
        <p className="skill-name">{name}</p>
      </div>
    </li>
  )
}

export default JobEachItemDetails
