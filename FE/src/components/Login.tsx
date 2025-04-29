import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleIcon, KakaoIcon, NaverIcon } from './icons/SocialIcons';
import './Login.css';
import postLogin from '@/common/api/login/postLogin';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    try {
      const data = postLogin(email, password);
      console.log('로그인 성공:', data);
      // 토큰 저장하거나 라우팅 처리

    } catch (err) {
      console.log(`오류 발생: ${err}`);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login logic
    console.log('Social login attempt:', provider);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>로그인</h1>
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
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <div className="divider">
          <span>또는</span>
        </div>

        <div className="social-login">
          <button 
            className="social-button google"
            onClick={() => handleSocialLogin('google')}
          >
            <GoogleIcon />
            Google로 계속하기
          </button>
          <button 
            className="social-button kakao"
            onClick={() => handleSocialLogin('kakao')}
          >
            <KakaoIcon />
            카카오로 계속하기
          </button>
          <button 
            className="social-button naver"
            onClick={() => handleSocialLogin('naver')}
          >
            <NaverIcon />
            네이버로 계속하기
          </button>
        </div>

        <div className="login-links">
          <Link to="/signup" className="signup-link">
            회원가입
          </Link>
          <Link to="/forgot-password" className="forgot-password-link">
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 