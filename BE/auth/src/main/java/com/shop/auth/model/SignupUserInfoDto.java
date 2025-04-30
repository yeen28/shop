package com.shop.auth.model;

import com.shop.auth.type.RoleType;
import lombok.Builder;

@Builder
public record SignupUserInfoDto(
		String email,
		String password,
		RoleType roleType
) {}