import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-links">
            <div className="footer-link-group">
              <h3>이용안내</h3>
              <ul>
                <li><a href="/terms">이용약관</a></li>
                <li><a href="/paid-service">유료서비스 이용 약관</a></li>
                <li><a href="/youth-policy">아동 및 청소년 보호 정책</a></li>
                <li><a href="/privacy">개인정보처리방침</a></li>
                <li><a href="/cookie">쿠키정책</a></li>
              </ul>
            </div>
            <div className="footer-link-group">
              <h3>고객센터</h3>
              <ul>
                <li><a href="/faq">자주 묻는 질문</a></li>
                <li><a href="/contact">1:1 문의</a></li>
                <li><a href="/notice">공지사항</a></li>
              </ul>
            </div>
            <div className="footer-link-group">
              <h3>회사 정보</h3>
              <ul>
                <li><a href="/about">회사 소개</a></li>
                <li><a href="/careers">채용 정보</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-business-info">
            <h3>위버스 컴퍼니 사업자 정보</h3>
            <p>전화번호: (+82) 1544-0790</p>
            <p>상호: Weverse Company Inc.</p>
            <p>대표자: 최준원</p>
            <p>주소: 경기도 성남시 분당구 분당내곡로 131, C동 6층 (백현동, 판교테크원타워)</p>
            <p>사업자등록번호: 716-87-01158 <a href="#">사업자정보확인</a></p>
            <p>통신판매업 신고번호: 제 2022-성남분당A-0557 호</p>
            <p>호스팅 서비스 사업자: Amazon Web Services, Inc., NAVER Cloud</p>
            <p>전자우편주소: weverse@weversecompany.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 Weverse Company Inc. or its affiliates (Weverse Japan & Weverse America Inc.) all rights reserved.
          </p>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 