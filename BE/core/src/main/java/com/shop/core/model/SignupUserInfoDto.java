package com.shop.core.model;

import com.shop.common.auth.type.RoleType;
import lombok.Builder;

@Builder
public record SignupUserInfoDto(
		String email,
		String password,
		RoleType roleType
) {}