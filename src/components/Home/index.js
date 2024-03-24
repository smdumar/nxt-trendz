import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

class Home extends Component{

  
renderHome = () => (
  <div className='home'>
  <Header />
  <div className="home-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png "
      alt="clothes that get you noticed"
      className="home-image-desktop"
    />
    <div className="home-content">
      <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png "
        alt="clothes that get you noticed"
        className="home-image"
      />
      <p className="home-paragraph">
        Fashion is part of the daily air and it does not quite help that it
        change all the time. Clothes have always been marker of the era and we
        are in a revolution.Your fashion makes you been seen and heard that
        the way you are. So celebrate the season new and exciting fashion in
        your own way
      </p>
      <Link to='/products'><button type="button" className="shop-now-button">
        Shop Now
      </button></Link>
    </div>
  </div>
</div>
)

render(){
    return this.renderHome()
  }
}

export default Home
