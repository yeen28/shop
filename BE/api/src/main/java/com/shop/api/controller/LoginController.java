package com.shop.api.controller;

import com.shop.auth.model.LoginModel;
import com.shop.auth.model.UserInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.shop.auth.service.LoginService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class LoginController {
	private final LoginService loginService;

	@Operation(summary = "Attempt Login")
	@PostMapping("/login")
	public LoginModel login(@RequestBody UserInfoDto userInfoDto) {
		try {
			String accessToken = loginService.login(userInfoDto);
			log.info("access token - {}", accessToken);
			return new LoginModel(1L, userInfoDto.getEmail());

		} catch (Exception e) {
			// TODO Exception 공통 로직 추가하기
			log.warn("Failed Login - {}", e.getMessage());
			throw new IllegalArgumentException();
		}
	}
}
