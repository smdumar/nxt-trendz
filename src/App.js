import { Component } from 'react'
import {Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ProductItemDetails from './components/ProductItemDetails'
import CartContext from './context/CartContext'



class App extends Component{
  state = {
    cartItemList : [],
  }

  addToCart = (product) => {
    const {cartItemList} = this.state 
    
    if(cartItemList.some( (item) => item.id === product.id)){
      return cartItemList
    }
    else{
      this.setState(prevState => ({cartItemList: [...prevState.cartItemList, product]}))
    }  
  }

  deleteCartItem = (id) => {
    this.setState(prevState => ({cartItemList:[...prevState.cartItemList.filter( (item) => item.id !== id )]}))
  }

  removeAllCartItem = () => {
    this.setState({cartItemList:[]})
  }

  render(){
    const {cartItemList} = this.state

    return(
        <CartContext.Provider value={{
          cartItemList,
          addToCart: this.addToCart,
          deleteCartItem:this.deleteCartItem,
          removeAllCartItem:this.removeAllCartItem
        }}>
          <Switch>          
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/products/:id" component={ProductItemDetails}/>
            <Route path='/not-found' component={NotFound}/>
            <Redirect to='/not-found'/>
          </Switch>
        </CartContext.Provider>
    )
  } 

}

export default App

