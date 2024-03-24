import { IoSearch } from "react-icons/io5"
import './index.css'

const FilterGroup = props => {
    const{clearFilter} = props

    const renderSearchInput = () => {
        const {changeSearchInput, searchInput, clickEnterSearch} = props

        const onChangeSearchInput = (event) => {
            changeSearchInput(event.target.value)
        }
            console.log(searchInput)
        return(
        <div className="filterGroup-searchContainer">
            <input type='search' placeholder='Search' className='filterGroup-SearchInput'onChange={onChangeSearchInput} value={searchInput}/>
            
            <IoSearch className="filterGroup-searchIcon" role='button' onClick={clickEnterSearch}/>
        </div>
    )
    }
    
    const renderCategoryList = () => {
        const {categoryList} = props
        

        return categoryList.map( eachCategory => {
            const {activeCategory, category} = props

            const changeCategory = () => {
                activeCategory(eachCategory.categoryId)
            }
            const isActive = category === eachCategory.categoryId
            const activeCategoryClassName = isActive ? 'active' : ''

            return(
                <li key={eachCategory.categoryId} onClick={changeCategory} className={`filterGroup-categoryList ${activeCategoryClassName}`}>{eachCategory.name}</li>
            )
        })

    }

    const renderCategory = () => (
        <div className="filterGroup-categoryContainer">
            <h1 className="filterGroup-categoryHeading">Category</h1>
            <ul className='filterGroup-ulContainer'>{renderCategoryList()}</ul>
        </div>
    )
    
    const renderRatingList = () => {
        const {ratingList} = props
        return ratingList.map( eachRating => {
            const {rating, activeRating} = props
            const changeRating = () => {
                activeRating(eachRating.ratingId)
            }
            const isActive = rating === eachRating.ratingId
            const activeRatingClassName = isActive ? 'active' : ''

            return(
                    <li key={eachRating.ratingId} className={`filterGroup-ratingList ${activeRatingClassName}`} onClick={changeRating}>
                        <img src={eachRating.imgUrl} alt={eachRating.ratingId} className='filterGroup-ratingImage'/>
                        <p className="filterGroup-ratingPara">& Up</p>
                    </li>                
            )
        })
    }

    const renderRating = () => (
        <div className="filterGroup-ratingContainer">
            <h1 className="filterGroup-ratingHeading">Rating</h1>
            <ul className='filterGroup-ulContainer'>{renderRatingList()}</ul>
        </div>
    )

    const onClearFilter = () =>(
        clearFilter()
    )

    return(
            <div className="filterGroup-section">
            {renderSearchInput()}
            {renderCategory()}
            {renderRating()}
            <button type="button" className="filterGroup-clearBtn" onClick={onClearFilter}>Clear Filter</button>

        </div>
        
        
    )
}
export default FilterGroup