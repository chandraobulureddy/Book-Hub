import Header from '../Header'
import Footer from '../Footer'
import FavoriteContext from '../../Context/FavoriteContext'
import BookItem from '../BookItem'

import './index.css'

const MyFavorites = props => {
  const onClickedFavorite = () => {
    const {history} = props
    history.push('/shelf')
  }

  return (
    <>
      <Header favorite />
      <FavoriteContext.Consumer>
        {value => {
          const {favoriteList} = value
          return (
            <div className="favorite-books-bg-container">
              {favoriteList.length === 0 ? (
                <div className="no-favorite-container">
                  <img
                    src="https://res.cloudinary.com/dzqwhkjng/image/upload/v1671003989/Group_7484_bqym5d.png"
                    className="no-favorite-image"
                    alt="no favorite"
                  />
                  <p className="no-favorite-text">Favorite Books</p>
                  <button
                    className="failure-button"
                    onClick={onClickedFavorite}
                    type="button"
                  >
                    Add Favorite
                  </button>
                </div>
              ) : (
                <ul className="favorite-books-list-container">
                  {favoriteList.map(eachItem => (
                    <BookItem key={eachItem.id} bookDetails={eachItem} />
                  ))}
                </ul>
              )}
            </div>
          )
        }}
      </FavoriteContext.Consumer>
      <Footer />
    </>
  )
}

export default MyFavorites
