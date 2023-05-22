import {withRouter} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'
import FavoriteContext from '../../Context/FavoriteContext'

import './index.css'

const BookItem = props => {
  const onClickBookItem = () => {
    const {bookDetails} = props
    const {id} = bookDetails
    const {history} = props
    history.push(`/books/${id}`)
  }
  const {bookDetails} = props
  const {id, title, readStatus, rating, authorName, coverPic} = bookDetails

  return (
    <FavoriteContext.Consumer>
      {value => {
        const {onToggleFavorite, favoriteList} = value
        const isChecked = favoriteList.find(eachItem => eachItem.id === id)
        const onChangeFavorite = () => {
          onToggleFavorite(bookDetails)
        }
        return (
          <li className="book-item-list-container" key="title">
            <div>
              <button
                className="book-item-btn"
                onClick={onClickBookItem}
                type="button"
              >
                <img
                  className="book-item-cover-pic"
                  src={coverPic}
                  alt={title}
                />
              </button>
            </div>
            <div className="book-item-details-card-container">
              <h1 className="book-item-title" key={title}>
                {title}
              </h1>
              <p className="book-item-author-name">{authorName}</p>
              <p className="book-item-details-rating">
                Avg Rating
                <span className="book-item-details-rating-span">
                  <BsFillStarFill color="#FBBF24" size={12} />
                </span>
                {rating}
              </p>

              <p className="book-item-details-status">
                Status:
                <span className="book-item-details-status-span">
                  {readStatus}
                </span>
              </p>
              <div className="favorite-container-div">
                <div>
                  <label className="favorite-text" htmlFor={id}>
                    Add to Favorite:
                  </label>
                </div>
                <div>
                  <input
                    className="favorite-input"
                    onChange={onChangeFavorite}
                    id={id}
                    isChecked={isChecked}
                    type="checkBox"
                  />
                </div>
              </div>
            </div>
          </li>
        )
      }}
    </FavoriteContext.Consumer>
  )
}

export default withRouter(BookItem)
