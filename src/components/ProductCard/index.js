import {Link} from 'react-router-dom'
import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {imageUrl, title, price, rating, brand,id} = productData
  return (
    <li className="product-card-container">
        <Link to={`/products/${id}`} className='link'>
          <img src={imageUrl} alt="" className="product-card-image" />
          <div className="product-card-details">
            <h1 className="product-card-heading">{title}</h1>
            <p className="product-card-description">by {brand}</p>
            <div className="product-card-price-and-rating">
              <p className="product-card-price">Rs {price}/-</p>
              <div className="product-card-rating-container">
                <p className="product-card-rating">{rating}</p>
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
export default ProductCard
