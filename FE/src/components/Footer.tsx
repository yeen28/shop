import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>고객센터</h4>
          <p className="phone">1544-0790</p>
          <p className="hours">평일 09:00 - 18:00</p>
        </div>
        <div className="footer-section">
          <h4>회사정보</h4>
          <p>상호: Weverse Company Inc.</p>
          <p>대표자: 최준원</p>
          <p>사업자등록번호: 716-87-01158</p>
        </div>
        <div className="footer-section">
          <h4>주소</h4>
          <p>경기도 성남시 분당구 분당내곡로 131, C동 6층</p>
          <p>(백현동, 판교테크원타워)</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Weverse Company Inc. or its affiliates (Weverse Japan & Weverse America Inc.) all rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer 