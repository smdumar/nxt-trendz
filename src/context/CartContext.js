import React from "react"

const CartContext = React.createContext({
    cartItemList : [],
    totalAmount: 0,
    addToCart: () => {},
    deleteCartItem : () => {},
    removeAllCartItem : () => {}
})

export default CartContext