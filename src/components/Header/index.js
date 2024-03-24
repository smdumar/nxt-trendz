import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import CartContext from '../../context/CartContext'

const Header = (props) => {
  
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const renderCartCountNotification = () => (
    <CartContext.Consumer>
      {value => {
        const {cartItemList} = value
        const cartCount = cartItemList.length
        return(
          cartCount > 0 ? <span className="cartCount-notification">{cartCount}</span> : null
        )
      }}
    </CartContext.Consumer>
  )

  return(
  <div className="header-container">
    <div className="header">
      
      <div className="logo-logout-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
          className="header-website-Logo"
        />
        
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
          alt="nav-logout"
          className="logout-icon" onClick={onLogout}
        />
      </div>

      <div className="header-icon-container">
        <Link to='/' className='nav-link'>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
          alt="nav-home"
          className="icon"
        />
        </Link>
        <Link to='/products' className='nav-link'>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png "
          alt="nav-products"
          className="icon"
        />
        </Link>
        <Link to='/cart' className='nav-link'>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
          alt="nav-cart"
          className="icon"
        />
        {renderCartCountNotification()}
        </Link>
      </div>
    </div>

    <div className="header-desktop-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        alt="website logo"
        className="header-website-Logo-desktop"
      />

      <ul className="nav-items">
        <Link to='/' className='nav-link'><li className="nav-list">Home</li></Link>
        <Link to='/products' className='nav-link'><li className="nav-list">Products</li></Link>
        <Link to='/cart' className='nav-link'><li className="nav-list">Cart {renderCartCountNotification()}</li></Link>
        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </ul>
    </div>
  </div>
)
}
export default withRouter(Header)
