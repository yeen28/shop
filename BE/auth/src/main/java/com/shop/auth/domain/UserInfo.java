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
public class UserInfo extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(nullable = false, unique = true)
	private String email;
	@Column(nullable = false)
	private String password;
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private RoleType role = RoleType.ROLE_USER;

	/**
	 * 기본 RoleType은 ROLE_USER
	 * @param userInfoDto
	 * @return
	 */
	public static UserInfo of(UserInfoDto userInfoDto) {
		return of(userInfoDto, RoleType.ROLE_USER);
	}

	public static UserInfo of(UserInfoDto userInfoDto, RoleType role) {
		return UserInfo.builder()
				.email(userInfoDto.getEmail())
				.password(userInfoDto.getPassword()) // TODO encoding된 pw로 수정필요
				.role(role)
				.build();
	}

	public static UserInfo byEncodePassword(UserInfoDto userInfoDto, String password) {
		return UserInfo.builder()
				.email(userInfoDto.getEmail())
				.password(password)
				.role(RoleType.ROLE_USER)
				.build();
	}
}