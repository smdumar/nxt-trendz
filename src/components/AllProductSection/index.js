import {Component} from 'react'
import {ThreeDots} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import ProductHeaders from '../ProductHeaders'
import FilterGroup from '../FilterGroup'
import './index.css'

const apiConstantStatus = {
  initial : 'INITIAL',
  success : 'SUCCESS',
  inProgress : 'IN_PROGRESS',
  failure : 'FAILURE'
}

const categoryList = [
  {name: 'Clothing' , categoryId:'1'},  
  {name: 'Electronics' , categoryId:'2'},
  {name: 'Appliances' , categoryId:'3'},
  {name: 'Grocery' , categoryId:'4'},
  {name: 'Toys' , categoryId:'5'}
]

const ratingList = [
  {ratingId:'4', imgUrl:'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png'},
  {ratingId:'3', imgUrl:'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png'},
  {ratingId:'2', imgUrl:'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png'},
  {ratingId:'1', imgUrl:'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png'}
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

class AllProductSection extends Component {
  state = {
    apiStatus:apiConstantStatus.initial,
    productList: [],
    isLoading: true,
    activeOptionId:sortbyOptions[0].optionId,
    category:'',
    rating:'',
    searchInput:''
  }

  updateActiveOptionId = activeOptionId => {
    this.setState({activeOptionId:activeOptionId}, this.getProducts)
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({apiStatus:apiConstantStatus.inProgress})
    const {activeOptionId, category, rating, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${searchInput}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.products.map(product => ({
        id: product.id,
        brand: product.brand,
        title: product.title,
        rating: product.rating,
        price: product.price,
        imageUrl: product.image_url,
      }))

      this.setState({productList: updatedData, apiStatus:apiConstantStatus.success})
    }
    else if(response.ok === false){
      this.setState({apiStatus:apiConstantStatus.failure})
    }
    else{
      this.setState({apiStatus:apiConstantStatus.inProgress})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <ThreeDots
        height="80"
        width="80"
        color="#0967d2"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )

  renderFailureView = () => (
    <div className='all-product-section-failureView'>
      <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png' 
      alt='products failure' 
      className='all-product-section-failureViewImage'/>
      <h1 className='all-product-section-failure-heading'>Oops! Something Went Wrong</h1>
      <p className='all-product-section-failure-para'>We are having some trouble processing your request. Please try again.</p>
    </div>
  )

//  FilterGroup Page...............


  activeCategory = (categoryId) => {
    this.setState({category:categoryId}, this.getProducts)
  }

  activeRating = (ratingId) => {
    this.setState({rating:ratingId}, this.getProducts)
  }

  changeSearchInput = (searchInput) => {
    this.setState({searchInput}, this.getProducts)
  }

  clickEnterSearch = (event) => {
    if(event.keyDown === 'Enter'){
        this.getProducts()
    }
  }

  clearFilter = () =>{
    this.setState({category:'', rating:'', searchInput:''}, this.getProducts)
  }

  renderNoProducts = () => (
    <div className='all-product-section-noProduct-failureView'>
      <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png ' alt='no products' className='all-product-section-noProduct-failureViewImage'/>
      <h1 className='all-product-section-noProduct-failure-heading'>No Products Found</h1>
      <p className='all-product-section-noProduct-failure-para'>We could not find any products. Try other filters</p>
    </div>
  )
//................................................

  renderProductList = () => {
    const {productList, activeOptionId} = this.state
    const findProducts = productList.length > 0 
    return findProducts ? (
      <div className='all-product'>          
          <ProductHeaders sortbyOptions={sortbyOptions} activeOptionId={activeOptionId} updateActiveOptionId={this.updateActiveOptionId}/>
          <ul className="all-product-section-ul-container">
            {productList.map(eachProduct => (
              <ProductCard productData={eachProduct} key={eachProduct.id} />
            ))}
          </ul>

        </div>
 
    )  :  (this.renderNoProducts())
  }

  renderAllProduct = () => {
    const {apiStatus} = this.state
    
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderProductList()
      case apiConstantStatus.inProgress:
        return this.renderLoader()
      case apiConstantStatus.failure:
        return this.renderFailureView() 
      default:
        return null;
    }
    
  }

  render() {
    const {category, rating, searchInput} = this.state
    return (
      <div className='all-products-page'>

        <div className='filterGroup'>
          <FilterGroup categoryList={categoryList} 
                ratingList={ratingList}
                category={category}
                rating={rating}
                activeCategory={this.activeCategory}
                activeRating={this.activeRating} 
                searchInput={searchInput}
                changeSearchInput={this.changeSearchInput}
                clickEnterSearch={this.clickEnterSearch}
                clearFilter={this.clearFilter}/>
        </div>

        <div className='allProduct'>
          {this.renderAllProduct()}
        </div>

        </div>
    )
  }
}
export default AllProductSection
