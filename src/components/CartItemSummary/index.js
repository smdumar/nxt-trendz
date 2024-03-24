import './index.css'
import CartContext from '../../context/CartContext'

const CartItemSummary = () => {

    const renderCartItemSummary = () => (
        <CartContext.Consumer>
            {value => {
                const {cartItemList} = value
                let totalAmount = 0
                cartItemList.forEach( (each) => {
                    totalAmount += each.count * each.price
                })

                return(
                    <div className="cartItemSummary-container">
                        <div className="cartItemSummary-orderDetail-container">
                            <h1 className="cartItemSummary-heading">Order Total: <span className="orderAmount">Rs {totalAmount}/-</span> </h1>
                            <p className="cartItemSummary-para">Items is Cart: <span className="orderAmount">{cartItemList.length}</span></p>
                        </div>
                        <button type='button' className="cartItemSummary-btn">Checkout</button>
                    </div>                    
                )
            }}
        </CartContext.Consumer>
    )

    return renderCartItemSummary()
}

export default CartItemSummary