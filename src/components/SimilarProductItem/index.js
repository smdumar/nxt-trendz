import './index.css'

const SimilarProductItem = (props) => {    
    
    const renderSimilarProducts = () => {
        const {similar} = props
        const {brand, imageUrl, price, rating, title} = similar

        return(
            <li className='similarProductItem-list'>
                <div className='similarProductItem-imgContainer'>
                    <img src={imageUrl} alt={title} className='similarProductItem-img'/>
                </div>

                <div className='similarProductItem-titleContainer'>
                    <h1 className='similarProductItem-title'>{title}</h1>
                </div>

                <div className='similarProductItem-detailsContainer'>
                    <p className='similarProductItem-brand'>{brand}</p>

                    <div className='similarProductItem-priceAndRatingContainer'>
                    <p className='similarProductItem-price'>Rs {price}/-</p>
                    
                    <div className='similarProductItem-ratingContainer'>
                        <p className='similarProductItem-rating'>{rating}</p>
                        <img src='https://assets.ccbp.in/frontend/react-js/star-img.png' alt='stars' className='similarProductItem-ratingImg'/>
                    </div>
                    </div>

                </div>
            </li>
            

        )

    }   

        return renderSimilarProducts()

}
export default SimilarProductItem