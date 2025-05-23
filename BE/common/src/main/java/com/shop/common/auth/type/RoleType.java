package com.shop.common.auth.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum RoleType {
	ROLE_USER("ROLE_USER"),
	ROLE_MANAGER("ROLE_MANAGER"),
	ROLE_ADMIN("ROLE_ADMIN");

	@Getter private final String value;

	/**
	 * 문자열을 enum으로 변환
	 * @param value role 문자열
	 * @return RoleType
	 */
	public static RoleType from(String value) {
		for (RoleType role : RoleType.values()) {
			if (role.value.equalsIgnoreCase(value)) {
				return role;
			}
		}
		throw new IllegalArgumentException("Unknown role: " + value);
	}

	@Override
	public String toString() {
		return value;
	}
}