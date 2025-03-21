import './ProductsSection.css'

interface Product {
  id: number
  name: string
  price: string
  image: string
  category: string
}

interface ProductsSectionProps {
  products: Product[]
}

const ProductsSection = ({ products }: ProductsSectionProps) => {
  return (
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
  )
}

export default ProductsSection 