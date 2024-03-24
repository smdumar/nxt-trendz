import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'


const  Cart = () => {

  const renderCarItemList = () => (
    
    <CartContext.Consumer>{
      value => {
        const {cartItemList, removeAllCartItem} = value
        const onRemoveAllCartItem = () => {
          removeAllCartItem()
        } 

        if(cartItemList.length > 0){
        return(
          <>
          <div className="cart-heading-container">
            <h1 className="cart-heading">Your Cart</h1>  
            <h1 className="cart-removeAll-btn" typeof='button' onClick={onRemoveAllCartItem}>Remove All</h1>   
          </div>

              <div className="cart-container">                
                {
                  cartItemList.map( (eachCartItem) => (
                    <CartItem key={eachCartItem.id} eachCartItem={eachCartItem}/>
                  ))
                }     
              </div>
             
          </>
        )
        }
        else{
          return(
              <div className='emptyCart-container'>
                <img src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png' alt='' className="emptyCart-img"/>
                <h1 className='emptyCart-heading'>Your Cart is Empty</h1>
                <Link to='/products'><button type='button' className="emptyCart-btn">Buy Products</button></Link>
              </div>
            
          )
        }
      }
      
      }</CartContext.Consumer>
  )

    return(
      <div className='cart-page'>
          <Header />
          {renderCarItemList()}
      </div>
  
    )   
  

}


export default Cart
