import './index.css'

import Loader from 'react-loader-spinner'

const LoaderEl = () => (
  <div className="loader-container" testid="loader">
    <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
  </div>
)
export default LoaderEl
