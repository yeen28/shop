package com.shop.auth.service;

import com.shop.auth.domain.UserInfo;
import com.shop.auth.model.UserInfoDto;
import com.shop.auth.repository.UserInfoRepository;
import com.shop.auth.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LoginService {
	private final UserInfoRepository userInfoRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	/**
	 * @param userInfoDto
	 * @return access token
	 */
	public String login(UserInfoDto userInfoDto) {
		String email = userInfoDto.getEmail();

		UserInfo userInfo = userInfoRepository.findByEmail(email);
		if (userInfo == null) {
			throw new UsernameNotFoundException("Not Found User");
		}

		if (!passwordEncoder.matches(userInfoDto.getPassword(), userInfo.getPassword())) {
			throw new BadCredentialsException("Not Matched Password");
		}

		return jwtUtil.generateAccessToken(userInfo);
	}

	public void save(UserInfoDto userInfoDto) {
		String encodePassword = passwordEncoder.encode(userInfoDto.getPassword());
		userInfoRepository.save(UserInfo.byEncodePassword(userInfoDto, encodePassword));
	}
}