import {FaGoogle, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-section-container">
    <div>
      <FaGoogle className="footer-icons" />
      <FaTwitter className="footer-icons" />
      <FaInstagram className="footer-icons" />
      <FaYoutube className="footer-icons" />
    </div>
    <p className="footer-text">Contact Us</p>
  </div>
)

export default Footer
