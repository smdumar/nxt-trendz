import { BsFilterLeft } from "react-icons/bs";
import './index.css'

const ProductHeaders = props => {
    const {sortbyOptions, activeOptionId, updateActiveOptionId} = props

    const onChangeSortby = event => {
        updateActiveOptionId(event.target.value)
    }

    return(
    <div className="product-headers-section">
        <h1 className="product-headers-section-headers">All Products</h1>
        <div className="product-headers-section-sortby-container">
            <BsFilterLeft className="product-headers-section-sortby-filter-icon"/>
            <h1 className="product-headers-section-sortby">Sort by</h1>
            <select className="product-headers-section-select" value={activeOptionId} onChange={onChangeSortby}>
                {
                    sortbyOptions.map( eachOption => (
                        <option value={eachOption.optionId}>{eachOption.displayText}</option>
                    ) )
                }
            </select>
        </div>
    </div>
)
}
export default ProductHeaders