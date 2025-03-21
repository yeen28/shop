import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password recovery logic
    console.log('Password recovery attempt:', { email });
    setIsSubmitted(true);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1>비밀번호 찾기</h1>
        {!isSubmitted ? (
          <>
            <p className="description">
              가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="이메일을 입력하세요"
                />
              </div>
              <button type="submit" className="submit-button">
                비밀번호 재설정 링크 받기
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <p>
              입력하신 이메일 주소로 비밀번호 재설정 링크를 보냈습니다.<br />
              이메일을 확인해 주세요.
            </p>
            <Link to="/login" className="login-link">
              로그인 페이지로 돌아가기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword; 