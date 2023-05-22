import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import LoaderEl from '../Loader'

const currentApiStatuses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {
    bookDetails: {},
    apiStatus: currentApiStatuses.initial,
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = {
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        id: data.book_details.id,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      this.setState({
        bookDetails: updateData,
        apiStatus: currentApiStatuses.success,
      })
    } else {
      this.setState({apiStatus: currentApiStatuses.failure})
    }
  }

  tryAgainBtn = () => {
    this.getBookDetails()
  }

  renderLoader = () => (
    <div className="loader-el">
      <LoaderEl />
    </div>
  )

  renderFailure = () => (
    <div className="home-failure-container book-failure-each-div-one">
      <img
        src="https://res.cloudinary.com/dzqwhkjng/image/upload/v1670854414/Group_7522_wgdcsq.png"
        alt="failure view"
        className="home-failure-img"
      />
      <p className="home-failure-para">
        Something went wrong. Please try again
      </p>
      <button
        className="try-again-button"
        onClick={this.tryAgainBtn}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetail = () => {
    const {bookDetails} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
    } = bookDetails
    return (
      <>
        <div className="book-each-sub-container ">
          <div className="book-each-card">
            <div className="book-each-author-img-div">
              <div className="book-each-author-card">
                <div>
                  <img src={coverPic} alt={title} className="book-each-img" />
                </div>
                <div className="book-each-author-details">
                  <h1 className="book-each-title" key={title}>
                    {title}
                  </h1>
                  <p className="book-each-author-name">{authorName}</p>
                  <p className="book-each-author-name">
                    Avg Rating
                    <span className="book-each-rating-span">
                      <BsFillStarFill color="#FBBF24" size={16} />
                    </span>
                    {rating}
                  </p>
                  <p className="book-each-author-name">
                    Status:
                    <span className="book-each-status-span">{readStatus}</span>
                  </p>
                </div>
              </div>
            </div>
            <hr className="hr" />
            <div className="book-each-about-div">
              <h1 className="book-each-about-author-header">About Author</h1>
              <p className="book-each-about-author">{aboutAuthor}</p>
            </div>
            <div className="book-each-about-div">
              <h1 className="book-each-about-author-header">About Book</h1>
              <p className="book-each-about-author">{aboutBook}</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderBooks = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case currentApiStatuses.initial:
        return this.renderLoader()
      case currentApiStatuses.success:
        return this.renderBookDetail()
      case currentApiStatuses.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="book-each-details-container">
        <div>
          <Header />
          {this.renderBooks()}
        </div>
        <div className="footer-section">
          <Footer />
        </div>
      </div>
    )
  }
}
export default BookDetails
