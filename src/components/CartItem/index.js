import { TiDelete } from "react-icons/ti"
import CartContext from "../../context/CartContext"
import CartItemSummary from "../CartItemSummary"

import './index.css'

const CartItem  = (props) => {

    const renderCartItemList = () => (
        <CartContext.Consumer>{
            value => {
                const {deleteCartItem} = value            
                const {eachCartItem} = props
                const {imageUrl, title, brand, price, availability, id, count} = eachCartItem
                const productPrice = price * count
                
                const onDeleteCartItem = () => {
                    deleteCartItem(id)
                }
                
                return(
                    <>
                    <div className="cartItem-page">
                        <div className="cartItem-container">
                    
                            <div className="cartItem-imgContainer">
                                <img src={imageUrl} alt='' className="cartItem-img"/>
                            </div>
                    
                            <div className="cartItem-details-container">
                                <h1 className="cartItem-productTitle">{title}</h1>
            
                                <div className="cartItem-brandAndAvailability-container">
                                    <p className="cartItem-productBrand">{brand}</p>
                                    <p className="cartItem-productStock">{availability}</p>
                                </div>
                    
                                <div className="cartItem-priceAndAvailability-container">
                                    <p className="cartItem-price">Rs {productPrice}/-</p>
                                    
                                    <p className="cartItem-quantity">Quantity: {count}</p>
                                </div>
                    
                            </div>
                    
                            <div className="cartItem-deleteIcon-container">
                                <TiDelete className="cartItem-deleteIcon" role="button" onClick={onDeleteCartItem}/>
                            </div>
                    
                        </div>
                       
                    </div>
                    <div className="cartItem-cartItemSummary-container">
                        <CartItemSummary/>
                     </div>
                    </>
                )
            }
            }</CartContext.Consumer>
    )


        return renderCartItemList()
        
    }

export default CartItem