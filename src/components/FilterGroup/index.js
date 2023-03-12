import './index.css'

const FilterGroup = props => {
  const {employmentList, salaryRangesList} = props
  const renderEmployList = () => (
    <div>
      <h1 className="employ-salary-name">Type of Employment</h1>

      <ul className="employ-un-order-list-container">
        {employmentList.map(eachEmploy => {
          const {employListChange} = props

          const onChangeEmployList = event => {
            employListChange(event.target.value)
          }

          return (
            <li
              onChange={onChangeEmployList}
              key={eachEmploy.employmentTypeId}
              className="employ-list-item"
            >
              <input
                type="checkbox"
                id={eachEmploy.employmentTypeId}
                value={eachEmploy.employmentTypeId}
              />
              <label
                htmlFor={eachEmploy.employmentTypeId}
                className="label-name"
              >
                {eachEmploy.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const renderEmploySalary = () => (
    <div className="salary-container">
      <h1 className="employ-salary-name">Salary Range</h1>

      <ul className="salary-un-order-list-container">
        {salaryRangesList.map(eachSalary => {
          const {salaryChange} = props

          const onClickSalary = () => {
            salaryChange(eachSalary.salaryRangeId)
          }

          return (
            <li
              className="employ-list-item"
              onClick={onClickSalary}
              key={eachSalary.salaryRangeId}
            >
              <input type="radio" id={eachSalary.salaryRangeId} name="salary" />
              <label htmlFor={eachSalary.salaryRangeId} className="label-name">
                {eachSalary.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <div>
      {renderEmployList()}
      <hr className="hr-line" />
      <div>{renderEmploySalary()}</div>
    </div>
  )
}

export default FilterGroup
