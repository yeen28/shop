package com.shop.auth.domain;

import com.shop.auth.model.UserInfoDto;
import com.shop.auth.type.RoleType;
import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED) // UserInfo userInfo = new UserInfo()를 방지하고 UserInfo.of(...)로만 사용하도록 유도
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
	private RoleType role;

	public static UserInfo of(
			final String email,
			final String encodedPassword,
			final RoleType role
	) {
		return UserInfo.builder()
				.email(email)
				.password(encodedPassword)
				.role(Objects.isNull(role) ? RoleType.ROLE_USER : role)
				.build();
	}

	/**
	 * 비밀번호 변경.
	 * setter를 열어두면 객체 일관성이 깨질 위험이 있기 때문에 명시적인 목적이 있는 메서드로 제공하여 사용 의도를 제한.
	 * @param encodedPassword
	 */
	public void changePassword(String encodedPassword) {
		this.password = encodedPassword;
	}
}