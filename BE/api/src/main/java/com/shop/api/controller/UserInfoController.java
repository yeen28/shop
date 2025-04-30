package com.shop.api.controller;

import com.shop.auth.common.response.BaseResponse;
import com.shop.auth.common.response.ErrorCode;
import com.shop.auth.model.SignupUserInfoDto;
import com.shop.auth.model.UserInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.shop.auth.service.UserInfoService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserInfoController {
	private final UserInfoService userInfoService;

	@Operation(summary = "Attempt Login")
	@Parameter(name = "userInfoDto", example = """
			{"email": "wee@email.com", "password": "password"}
			""")
	@PostMapping("/login")
	public BaseResponse login(@RequestBody UserInfoDto userInfoDto) {
		try {
			return BaseResponse.success(userInfoService.login(userInfoDto));

		} catch (Exception e) {
			log.warn("Failed Login - {}", e.getMessage());
			return BaseResponse.fail(ErrorCode.FORBIDDEN_ACCESS);
		}
	}

	@Operation(summary = "Logout")
	@GetMapping("/logout")
	public void logout() {
	}

	@Operation(summary = "Sign up")
	@Parameter(name = "userInfoDto", example = """
			{"email": "wee@email.com", "password": "password", "roleType": "ROLE_USER"}
			""")
	@PostMapping("/signup")
	public BaseResponse signup(@RequestBody SignupUserInfoDto dto) {
		userInfoService.signup(dto);
		return BaseResponse.success();
	}

	@Operation(summary = "Get All Users")
	@GetMapping("/admin/users")
	public BaseResponse getAllUsers() {
		return BaseResponse.success();
	}
}