import {Component} from 'react'
import {ThreeDots} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import PrimeProductCard from '../PrimeProductCard'
import './index.css'

const apiStatusConstant = {
    initial:'INITIAL',
    success:'SUCCESS',
    failure: 'FAILURE',
    inProgress:'IN_PROGRESS'
}

class PrimeDealSection extends Component{
    state = {
        primeProductList : [],
        apiStatus:apiStatusConstant.initial,
        isLoading:true
    }

    componentDidMount(){
        this.getPrimeDeals()
    }

    renderLoader = () => (
        <div className="products-loader-container">
          <ThreeDots height="80"width="80"color="#0967d2" radius="9" riaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass=""/>
        </div>
      )

    getPrimeDeals = async() => {
    this.setState({apiStatus:apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/prime-deals' 
    const options = {
        method:'GET',
        headers:{
            Authorization: `Bearer ${jwtToken}`
        }
    }
    const response = await fetch(apiUrl, options)
    // console.log(response)
    if(response.ok === true){
        const data = await response.json()
        // console.log(data)
        const updatedData = data.prime_deals.map( primeProducts => ({
            availability:primeProducts.availability,
            brand:primeProducts.brand,
            id:primeProducts.id,
            price:primeProducts.price,
            rating:primeProducts.rating,
            imageUrl:primeProducts.image_url,
            style:primeProducts.style,
            title:primeProducts.title,
            totalReviews:primeProducts.total_reviews,
            description:primeProducts.description,

        }) )
        // console.log(updatedData)
        this.setState({primeProductList:updatedData, isLoading:false, apiStatus:'SUCCESS'})
    }
    else if(response.ok !== true){
        this.setState({apiStatus:'FAILURE'})
    }
    else{
        this.setState({apiStatus:'IN_PROGRESS'})
    }
    }

    renderPrimeDealList = () => {
        const {primeProductList} = this.state
        return(
            <div className='prime-product-container'>
                    <h1 className='prime-product-section-heading'>Exclusive Prime Deals</h1>
                    <ul className='prime-product-section-ul-container'>
                        {
                            primeProductList.map( (eachPrimeProducts) => (
                                <PrimeProductCard key={eachPrimeProducts.id} productData={eachPrimeProducts}/>
                                ) )
                        }
                    </ul>
            </div>
        )
    }

    renderPrimeDetailsFailureView = () => (
        <div className='prime-deal-banner-container'>
            <img src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png" alt='prime-deal-banner' className='prime-deal-banner'/>
        </div>
    )
    

    render(){
        const {apiStatus} = this.state
        switch (apiStatus) {
            case apiStatusConstant.success:
                return this.renderPrimeDealList()
            case apiStatusConstant.failure:
                return this.renderPrimeDetailsFailureView()
            case apiStatusConstant.inProgress:
                return this.renderLoader()        
            default:
                return null;
        }
    }
}

export default PrimeDealSection