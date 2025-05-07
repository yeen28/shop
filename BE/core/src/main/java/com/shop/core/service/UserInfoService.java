package com.shop.core.service;

import com.shop.common.response.ErrorCode;
import com.shop.core.domain.UserInfo;
import com.shop.core.model.SignupUserInfoDto;
import com.shop.core.model.UserInfoModel;
import com.shop.common.auth.util.JwtUtil;
import com.shop.core.model.UserInfoDto;
import com.shop.core.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserInfoService {
	private final UserInfoRepository userInfoRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	/**
	 * @param userInfoDto
	 * @return access token
	 */
	public String login(UserInfoDto userInfoDto) {
		String email = userInfoDto.email();

		UserInfo userInfo = userInfoRepository.findByEmail(email);
		if (userInfo == null) {
			throw new UsernameNotFoundException(String.format("%s - email:%s", ErrorCode.ENTITY_NOT_FOUND.getMessage(), email));
		}

		if (!passwordEncoder.matches(userInfoDto.password(), userInfo.getPassword())) {
			throw new BadCredentialsException(String.format("Not Matched Password - email:%s", email));
		}

		return jwtUtil.generateAccessToken(userInfo.getEmail(), userInfo.getRole());
	}

	@Transactional
	public void signup(SignupUserInfoDto signupDto) {
		String encodePassword = passwordEncoder.encode(signupDto.password());
		userInfoRepository.save(UserInfo.of(
				signupDto.email(),
				encodePassword,
				signupDto.roleType()
		));
	}

	public List<UserInfoModel> getAllUsers() {
		return UserInfoModel.of(userInfoRepository.findAll());
	}
}