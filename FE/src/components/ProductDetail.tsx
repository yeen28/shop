import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // 임시 상품 데이터
  const product = {
    id,
    name: '아티스트 상품',
    price: 25000,
    images: [
      'https://via.placeholder.com/600x600?text=Main',
      'https://via.placeholder.com/600x600?text=Detail1',
      'https://via.placeholder.com/600x600?text=Detail2',
    ],
    description: '상품 상세 설명입니다.',
    options: ['옵션1', '옵션2', '옵션3'],
    shipping: {
      method: '택배',
      fee: 3000,
      info: '- 배송비는 주문 건당 3,000원입니다.\n- 도서산간 지역은 추가 배송비가 발생할 수 있습니다.'
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-images">
          <div className="main-image">
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          <div className="thumbnail-list">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-info-detail">
          <h1 className="product-name">{product.name}</h1>
          <div className="product-price">₩{product.price.toLocaleString()}</div>
          
          <div className="product-options">
            <h3>상품 옵션</h3>
            <select className="option-select">
              {product.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="quantity-selector">
            <h3>수량</h3>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} disabled={quantity >= 10}>+</button>
            </div>
          </div>

          <div className="total-price">
            <span>총 상품 금액</span>
            <span className="price">₩{(product.price * quantity).toLocaleString()}</span>
          </div>

          <div className="purchase-buttons">
            <button className="cart-button">장바구니</button>
            <button className="buy-button">구매하기</button>
          </div>

          <div className="shipping-info">
            <h3>배송 정보</h3>
            <p>{product.shipping.info}</p>
          </div>
        </div>
      </div>

      <div className="product-description">
        <h2>상품 상세</h2>
        <div className="description-content">
          <img src={product.images[1]} alt="상품 상세 이미지" />
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 