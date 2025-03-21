import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGlobe, 
  FaShoppingCart, 
  FaUser, 
  FaMapMarkerAlt,
  FaCaretDown,
  FaSignOutAlt,
  FaHeadset
} from 'react-icons/fa';
import './Header.css';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="Weverse Shop" />
          </Link>
          <nav className="main-nav">
            <Link to="/" className="nav-link">홈</Link>
            <Link to="/products" className="nav-link">상품</Link>
            <Link to="/categories" className="nav-link">카테고리</Link>
          </nav>
        </div>
        <div className="header-right">
          <div className="header-actions">
            <div className="language-selector">
              <FaGlobe className="icon" />
              <select>
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
            </div>
            <div className="currency-selector">
              <select>
                <option value="KRW">KRW</option>
                <option value="USD">USD</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
            <button className="icon-button delivery-address">
              <FaMapMarkerAlt className="icon" />
              <span>배송지</span>
            </button>
            <Link to="/cart" className="icon-button cart-button">
              <FaShoppingCart className="icon" />
              <span>장바구니</span>
            </Link>
            <div className="user-actions">
              <Link to="/login" className="icon-button login-button">
                <FaUser className="icon" />
                <span>로그인</span>
              </Link>
              <div className="account-dropdown">
                <button 
                  className="icon-button account-button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <FaUser className="icon" />
                  <span>계정</span>
                  <FaCaretDown className={`icon dropdown-icon ${isDropdownOpen ? 'open' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item">
                      <FaSignOutAlt className="icon" />
                      <span>로그아웃</span>
                    </button>
                    <button className="dropdown-item">
                      <FaHeadset className="icon" />
                      <span>고객센터</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 