import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'new', name: '신상품' },
    { id: 'best', name: '베스트' },
    { id: 'sale', name: '세일' },
    { id: 'md', name: 'MD추천' }
  ]

  const products = [
    {
      id: 1,
      name: 'BTS Proof Album',
      price: '59,000원',
      image: 'https://via.placeholder.com/300x300',
      category: 'new'
    },
    {
      id: 2,
      name: 'TXT Lightstick',
      price: '45,000원',
      image: 'https://via.placeholder.com/300x300',
      category: 'best'
    },
    {
      id: 3,
      name: 'NewJeans Merch',
      price: '35,000원',
      image: 'https://via.placeholder.com/300x300',
      category: 'sale'
    },
  ]

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-slider">
            <div className="slide active">
              <img src="/hero-banner.jpg" alt="Hero Banner" />
            </div>
          </div>
        </section>

        <section className="category-section">
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        <section className="products-section">
          <div className="section-header">
            <h2>인기 상품</h2>
            <div className="view-options">
              <button className="grid-view active">그리드</button>
              <button className="list-view">리스트</button>
            </div>
          </div>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-badges">
                    <span className="badge new">NEW</span>
                    <span className="badge sale">SALE</span>
                  </div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="banner-section">
          <div className="banner-grid">
            <div className="banner-item">
              <img src="/banner1.jpg" alt="Banner 1" />
            </div>
            <div className="banner-item">
              <img src="/banner2.jpg" alt="Banner 2" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
