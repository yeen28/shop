import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGlobe, FaShoppingCart, FaUser, FaMapMarkerAlt, FaCaretDown, FaSignOutAlt, FaMusic } from 'react-icons/fa';
import AddressDialog from './AddressDialog';
import './Header.css';

interface Address {
  zipCode: string;
  address: string;
  detailAddress: string;
  recipient: string;
  phone: string;
}

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleAddressSave = (address: Address) => {
    setSelectedAddress(address);
    // TODO: Save address to backend or local storage
    console.log('Saved address:', address);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-left">
          <Link to="/" className="logo">
            <FaMusic className="icon" />
            <label>Wee Shop</label>
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
            <button className="icon-button delivery-address" onClick={() => setIsAddressDialogOpen(true)}>
              <FaMapMarkerAlt className="icon" />
              <span>배송지</span>
            </button>
            <Link to="/cart" className="icon-button cart-button">
              <FaShoppingCart className="icon" />
              <span>장바구니</span>
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddressDialog
        isOpen={isAddressDialogOpen}
        onClose={() => setIsAddressDialogOpen(false)}
        onSave={handleAddressSave}
      />
    </header>
  );
};

export default Header; 