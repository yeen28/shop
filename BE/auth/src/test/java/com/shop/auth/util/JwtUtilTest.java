package com.shop.auth.util;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import nl.altindag.log.LogCaptor;
import com.shop.auth.model.UserInfoDto;
import com.shop.auth.type.RoleType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import nl.altindag.log.model.LogEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.slf4j.Logger;
import java.util.Base64;
import static org.assertj.core.api.Assertions.assertThat;

class JwtUtilTest {
	@Mock private Logger logger;
	private JwtUtil jwtUtil;
	private static final String SECRET = "c2lsdmVybmluZS10ZWNoLXNwcmluZy1ib290LWp3dC10dXRvcmlhbC1zZWNyZXQtc2lsdmVybmluZS10ZWNoLXNwcmluZy1ib290LWp3dC10dXRvcmlhbC1zZWNyZXQK";
	private static final long EXPIRATION_TIME = 3600L; // 1시간

	@BeforeEach
	void setUp() {
		jwtUtil = new JwtUtil(SECRET, EXPIRATION_TIME);
	}

	@Nested
	@DisplayName("AccessToken 생성 테스트")
	class GenerateAccessTokenTests {

		@Test
		@DisplayName("정상적으로 AccessToken이 생성된다.")
		void generateAccessToken_success() {
			// given
			UserInfoDto userInfoDto = new UserInfoDto("test@example.com", "password", RoleType.ROLE_USER);

			// when
			String token = jwtUtil.generateAccessToken(userInfoDto);

			// then
			assertThat(token).isNotBlank();

			// 토큰 디코딩
			Claims claims = Jwts.parserBuilder()
					.setSigningKey(Keys.hmacShaKeyFor(Base64.getDecoder().decode(SECRET)))
					.build()
					.parseClaimsJws(token)
					.getBody();

			assertThat(claims.get("email", String.class)).isEqualTo(userInfoDto.getEmail());
			assertThat(claims.get("role", String.class)).isEqualTo(userInfoDto.getRole().name());
		}
	}

	@Nested
	@DisplayName("AccessToken 검증 테스트")
	class ValidateTokenTests {

		@Test
		@DisplayName("정상적인 토큰이면 true를 반환한다.")
		void validateToken_success() {
			// given
			UserInfoDto userInfoDto = new UserInfoDto("test@example.com", "password", RoleType.ROLE_USER);
			String token = jwtUtil.generateAccessToken(userInfoDto);

			// when
			boolean isValid = jwtUtil.validateToken(token);

			// then
			assertThat(isValid).isTrue();
		}

		@Test
		@DisplayName("잘못된 토큰이면 false를 반환한다.")
		void validateToken_invalidToken() {
			LogCaptor logCaptor = LogCaptor.forClass(JwtUtil.class);  // LogCaptor로 로그 캡처 시작

			// given
			String invalidToken = "invalid.token.string";

			// when
			boolean isValid = jwtUtil.validateToken(invalidToken);

			// then
			assertThat(isValid).isFalse();
			LogEvent logEvent = logCaptor.getLogEvents().getFirst();
			assertThat(logEvent.getThrowable().get())
					.isInstanceOf(MalformedJwtException.class);
		}
	}

	@Test
	@DisplayName("만료된 토큰이면 false를 반환한다.")
	void validateToken_expiredToken() {
		LogCaptor logCaptor = LogCaptor.forClass(JwtUtil.class);  // LogCaptor로 로그 캡처 시작

		// given - 아주 짧은 만료 시간을 가진 토큰 생성
		JwtUtil shortLivedJwtUtil = new JwtUtil(SECRET, 1L); // 1초만 유효
		UserInfoDto userInfoDto = new UserInfoDto("test@example.com", "password", RoleType.ROLE_USER);
		String token = shortLivedJwtUtil.generateAccessToken(userInfoDto);

		// sleep으로 만료 시간 지나게 함
		try {
			Thread.sleep(1500); // 만료 시간(1초)보다 긴 1.5초 대기
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
		}

		// when
		boolean isValid = shortLivedJwtUtil.validateToken(token);

		// then
		assertThat(isValid).isFalse();
		LogEvent logEvent = logCaptor.getLogEvents().getFirst();
		assertThat(logEvent.getThrowable().get())
				.isInstanceOf(ExpiredJwtException.class);
	}

	@Test
	@DisplayName("AccessToken에 id와 role이 정확히 저장된다.")
	void generateAccessToken_containsClaims() {
		// given
		UserInfoDto userInfoDto = new UserInfoDto("test@example.com", "password", RoleType.ROLE_USER);
		String token = jwtUtil.generateAccessToken(userInfoDto);

		// when
		Claims claims = Jwts.parserBuilder()
				.setSigningKey(Keys.hmacShaKeyFor(Base64.getDecoder().decode(SECRET)))
				.build()
				.parseClaimsJws(token)
				.getBody();

		// then
		assertThat(claims.get("email", String.class)).isEqualTo("test@example.com");
		assertThat(claims.get("role", String.class)).isEqualTo(RoleType.ROLE_USER.name());
	}
}