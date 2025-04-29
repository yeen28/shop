package com.shop.auth.model;

import com.shop.auth.domain.UserInfo;
import com.shop.auth.type.RoleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class UserInfoDto {
	private String email;
	private String password;
	private RoleType role;

	public static UserInfoDto of(UserInfo userInfo) {
		return UserInfoDto.builder()
				.email(userInfo.getEmail())
				.password(userInfo.getPassword())
				.role(userInfo.getRole())
				.build();
	}
}