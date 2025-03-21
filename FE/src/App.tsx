import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from '@components/Header'
import Footer from '@components/Footer'
import ProductDetail from '@components/ProductDetail'
import Login from '@components/Login'
import Signup from '@components/Signup'
import ForgotPassword from '@components/ForgotPassword'
import './styles/App.css'

type SortType = 'newest' | 'popular' | 'discount'

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortType, setSortType] = useState<SortType>('newest')

  const handleSort = (type: SortType) => {
    setSortType(type)
    // TODO: Implement sorting logic
    console.log('Sorting by:', type)
  }

  const banners = [
    {
      id: 1,
      title: '신상품',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60',
      link: '/new'
    },
    {
      id: 2,
      title: '인기상품',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&auto=format&fit=crop&q=60',
      link: '/popular'
    },
    {
      id: 3,
      title: '할인상품',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60',
      link: '/sale'
    },
    {
      id: 4,
      title: '베스트',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&auto=format&fit=crop&q=60',
      link: '/best'
    }
  ];

  const products = [
    {
      id: 1,
      title: '아티스트 상품 1',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=280&auto=format&fit=crop&q=60',
      price: 26000,
      badges: ['new']
    },
    {
      id: 2,
      title: '아티스트 상품 2',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=280&auto=format&fit=crop&q=60',
      price: 27000,
      badges: []
    },
    {
      id: 3,
      title: '아티스트 상품 3',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=280&auto=format&fit=crop&q=60',
      price: 28000,
      badges: ['new']
    },
    {
      id: 4,
      title: '아티스트 상품 4',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=280&auto=format&fit=crop&q=60',
      price: 29000,
      badges: ['sale']
    },
    {
      id: 5,
      title: '아티스트 상품 5',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=280&auto=format&fit=crop&q=60',
      price: 30000,
      badges: []
    },
    {
      id: 6,
      title: '아티스트 상품 6',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=280&auto=format&fit=crop&q=60',
      price: 31000,
      badges: ['new']
    },
    {
      id: 7,
      title: '아티스트 상품 7',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=280&auto=format&fit=crop&q=60',
      price: 32000,
      badges: []
    },
    {
      id: 8,
      title: '아티스트 상품 8',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=280&auto=format&fit=crop&q=60',
      price: 33000,
      badges: ['sale']
    }
  ];

  return (
    <>
      <section className="hero-section">
        <div className="hero-slider">
          <img 
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&auto=format&fit=crop&q=60" 
            alt="Hero Banner" 
          />
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
            <button 
              className={`sort-button ${sortType === 'newest' ? 'active' : ''}`}
              onClick={() => handleSort('newest')}
            >
              신상품
            </button>
            <button 
              className={`sort-button ${sortType === 'popular' ? 'active' : ''}`}
              onClick={() => handleSort('popular')}
            >
              인기순
            </button>
            <button 
              className={`sort-button ${sortType === 'discount' ? 'active' : ''}`}
              onClick={() => handleSort('discount')}
            >
              할인율
            </button>
          </div>
        </div>
        
        <div className="products-grid">
          {products.map((product) => (
            <Link to={`/products/${product.id}`} className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.title} />
                <div className="product-badges">
                  {product.badges.includes('new') && <span className="badge new">NEW</span>}
                  {product.badges.includes('sale') && <span className="badge sale">SALE</span>}
                </div>
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <div className="price">₩{product.price.toLocaleString()}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="banner-section">
        <div className="banner-grid">
          {banners.map((banner) => (
            <div className="banner-item" key={banner.id}>
              <img src={banner.image} alt={banner.title} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
