import {Component} from 'react'
import {Link} from 'react-router-dom'
import {ThreeDots} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import CartContext from '../../context/CartContext'
import './index.css'


const apiStatusConstant = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    inProgress: 'IN_PROGRESS',
    failure: 'FAILURE'
}

class ProductItemDetails extends Component{
    state = {
        apiStatus: apiStatusConstant.initial,
        productDetail: {},
        similarProducts:[],
        count: 1
    }

    componentDidMount(){
        this.renderDetails()
    }

    formattedData = (data) => ({
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        title: data.title,
        totalReviews: data.total_reviews
    
    })
    
    increaseCount = () => {
        this.setState( (prevState) => ({count:prevState.count + 1}))
    }
    
    decreaseCount = () => {
        const {count} = this.state
        if(count > 1){
            this.setState( (prevState) => ({count:prevState.count - 1}))
        }
    }
    
    renderFailureView = () => (
        <div className='productItemDetails-failureView-container'> 
            <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png' alt='failure view' className='productItemDetails-failureView-img'/>
            <h1 className='productItemDetails-failureView-heading'>Product Not Found</h1>
            <Link to='/products'><button type='button' className='productItemDetails-failureView-btn'>Continue Shopping</button></Link>
        </div>
    )

    renderLoader = () => (
        <div className="products-loader-container">
          <ThreeDots height="80"width="80"color="#0967d2" radius="9" riaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass=""/>
        </div>
    )

    
    renderDetails = async () => {
        this.setState({apiStatus:apiStatusConstant.inProgress})

        const jwtToken = Cookies.get('jwt_token')
        const {match} = this.props
        const {params} = match
        const {id} = params

        const apiUrl = `https://apis.ccbp.in/products/${id}`

        const options = {
            method: 'GET',
            headers : {
                Authorization:`Bearer ${jwtToken}`
            }
        }

        const response = await fetch(apiUrl, options)
        
        if (response.ok === true) {
            const data = await response.json()
            const updatedData = this.formattedData(data)
            const similarProductsDetails = data.similar_products.map( eachSimilarProducts => 
                 this.formattedData(eachSimilarProducts)
            )
            this.setState({productDetail:updatedData, 
                similarProducts:similarProductsDetails, 
                apiStatus:apiStatusConstant.success})
        }
        else if(response.ok === false){
            this.setState({apiStatus:apiStatusConstant.failure})
        }
        
    }

    renderProductDetails = () => (
        <CartContext.Consumer>{
            value => {
                const {productDetail, count , similarProducts} = this.state
                const {addToCart} = value
                const {availability, brand, description, imageUrl, price, rating, title, totalReviews} = productDetail

                const onAddToCart = () => {
                    addToCart({...productDetail, count})
                }     

                return(
                    <div>
                        <div className='ProductItemDetails'>
            
                            <div className='ProductItemDetails-imgContainer'>
                                <img src={imageUrl} alt='' className='ProductItemDetails-img'/>
                            </div>
            
                            <div className='ProductItemDetails-details'>
                                <h1 className='ProductItemDetails-title'>{title}</h1>
                                <p className='ProductItemDetails-price'>Rs {price}/-</p>
            
                                <div className='ProductItemDetails-rating-and-review-container'>
            
                                    <div className='ProductItemDetails-ratingContainer'>
                                        <p className='ProductItemDetails-rating'>{rating}</p>
                                        <img src='https://assets.ccbp.in/frontend/react-js/star-img.png ' alt='star' className='ProductItemDetails-ratingStarImg'/>
                                    </div>
            
                                    <p className='ProductItemDetails-review'>{totalReviews} Reviews</p>
            
                                </div>
            
                                <div className='ProductItemDetails-detailsContainer'>
                                    <p className='ProductItemDetails-description'>{description}</p>
                                </div>
            
                                <div className='ProductItemDetails-available-and-brand-container'>
                                    <p className='ProductItemDetails-available-and-brand'><span className='ProductItemDetails-available-and-brand-span'>Availability : </span>{availability}</p>
                                    <p className='ProductItemDetails-available-and-brand'><span className='ProductItemDetails-available-and-brand-span'>Brand : </span>{brand}</p>
                                </div>
            
                                <div className='ProductItemDetails-count-container'>
                                    <p className='ProductItemDetails-count' type='button' onClick={this.decreaseCount}>-</p>
                                    <h1 className='ProductItemDetails-count'>{count}</h1>
                                    <p className='ProductItemDetails-count' type='button' onClick={this.increaseCount}>+</p>
                                </div>
            
            
                            <button type='button' className='ProductItemDetails-AddToCartBtn' onClick={onAddToCart}>ADD TO CART</button>
                            </div>
                    
                    
                        </div>
            
                            <hr/>
            
                            <div className='similarProduct-container'>
                                <h1 className='similarProduct-title'>Similar Products</h1>
                                <ul className='similarProduct-ulContainer'>{
                                    similarProducts.map( (similar) => (
                                        <SimilarProductItem key={similar.id} similar={similar}/>
                                    ) )
                                    }</ul>
                            </div>
            
                    </div>
                )
            }
            
            
        }</CartContext.Consumer>
    )

    renderAllProducts = () => {
        const {apiStatus} = this.state
        
        switch (apiStatus) {
            case apiStatusConstant.success:
                return this.renderProductDetails()
            case apiStatusConstant.inProgress:
                return this.renderLoader()
            case apiStatusConstant.failure:
                return this.renderFailureView()        
            default:
                return null;
        }
    }

    render(){     

        return (
                
                <div className="productItemDetail-page">
                    <Header/>    
                    <div className='render'>                                  
                        {this.renderAllProducts()}
                    </div> 
                </div>
            )       
 
    }
}

export default ProductItemDetails