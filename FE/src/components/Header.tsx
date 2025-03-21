import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="header-left">
          <div className="logo">
            <img src="/weverse-logo.png" alt="Weverse Shop" />
          </div>
          <nav className="main-nav">
            <ul>
              <li><a href="#home">홈</a></li>
              <li><a href="#category">카테고리</a></li>
              <li><a href="#event">이벤트</a></li>
              <li><a href="#notice">공지사항</a></li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <div className="search-box">
            <input type="text" placeholder="검색어를 입력하세요" />
            <button className="search-btn">검색</button>
          </div>
          <div className="user-actions">
            <button className="cart-btn">
              <span className="icon">🛒</span>
              <span className="count">0</span>
            </button>
            <button className="login-btn">로그인</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 