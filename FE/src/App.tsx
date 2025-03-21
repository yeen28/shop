import React, { useState } from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'
import './styles/App.css'

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-slider">
            <img src="https://via.placeholder.com/1200x500" alt="Hero Banner" />
          </div>
        </section>
        
        <section className="category-section">
          <div className="category-tabs">
            <button 
              className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              전체
            </button>
            <button 
              className={`category-tab ${selectedCategory === 'album' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('album')}
            >
              앨범
            </button>
            <button 
              className={`category-tab ${selectedCategory === 'merch' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('merch')}
            >
              상품
            </button>
            <button 
              className={`category-tab ${selectedCategory === 'membership' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('membership')}
            >
              멤버십
            </button>
            <button 
              className={`category-tab ${selectedCategory === 'digital' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('digital')}
            >
              디지털
            </button>
          </div>
        </section>
        
        <section className="products-section">
          <div className="section-header">
            <h2>인기 상품</h2>
            <div className="view-options">
              <button className="active">신상품</button>
              <button>인기순</button>
              <button>할인율</button>
            </div>
          </div>
          
          <div className="products-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div className="product-card" key={item}>
                <div className="product-image">
                  <img src={`https://via.placeholder.com/280x280?text=Product${item}`} alt={`Product ${item}`} />
                  <div className="product-badges">
                    {item % 3 === 0 && <span className="badge new">NEW</span>}
                    {item % 4 === 0 && <span className="badge sale">SALE</span>}
                  </div>
                </div>
                <div className="product-info">
                  <h3>아티스트 상품 {item}</h3>
                  <div className="price">₩{(25000 + (item * 1000)).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="banner-section">
          <div className="banner-grid">
            <div className="banner-item">
              <img src="https://via.placeholder.com/600x300?text=Banner1" alt="Banner 1" />
            </div>
            <div className="banner-item">
              <img src="https://via.placeholder.com/600x300?text=Banner2" alt="Banner 2" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
