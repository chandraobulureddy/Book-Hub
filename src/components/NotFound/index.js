import './index.css'

import {Link, withRouter} from 'react-router-dom'

const NotFound = props => {
  const backToHomeBtn = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dzqwhkjng/image/upload/v1671003989/Group_7484_bqym5d.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found
      </p>
      <p className="not-found-para">Please go back to the homepage.</p>
      <div>
        <Link className="link" to="/">
          <button
            onClick={backToHomeBtn}
            className="not-found-btn"
            type="button"
          >
            Go Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}
export default withRouter(NotFound)
