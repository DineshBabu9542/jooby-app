import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="heading-not-found">Page Not Found</h1>
      <p className="description-not-found">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
