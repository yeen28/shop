package com.shop.auth.domain;

import com.shop.auth.model.UserInfoDto;
import com.shop.auth.type.RoleType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String email;
	private String password;
	@Enumerated(EnumType.STRING)
	private RoleType role;

	public static UserInfo of(UserInfoDto userInfoDto) {
		return UserInfo.builder()
				.email(userInfoDto.getEmail())
				.password(userInfoDto.getPassword()) // TODO encoding된 pw로 수정필요
				.role(userInfoDto.getRole())
				.build();
	}
}