import {Link} from 'react-router-dom'
import './index.css'

const PrimeProductCard = props => {
  const {productData} = props
  const {imageUrl, title, price, rating, brand,id} = productData
  return (
    <li className="primeProduct-card-container">
        <Link to={`/products/${id}`} className='link'>
          <img src={imageUrl} alt="" className="primeProduct-card-image" />
          <div className="primeProduct-card-details">
            <h1 className="primeProduct-card-heading">{title}</h1>
            <p className="primeProduct-card-description">by {brand}</p>
            <div className="primeProduct-card-price-and-rating">
              <p className="primeProduct-card-price">Rs {price}/-</p>
              <div className="primeProduct-card-rating-container">
                <p className="primeProduct-card-rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
            </div>
          </div>
        </Link>
    </li>
  )
}
export default PrimeProductCard
