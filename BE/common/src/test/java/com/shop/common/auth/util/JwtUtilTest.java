package com.shop.common.auth.util;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import nl.altindag.log.LogCaptor;
import com.shop.common.auth.type.RoleType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import nl.altindag.log.model.LogEvent;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import java.util.Base64;
import static org.assertj.core.api.Assertions.assertThat;

class JwtUtilTest {
	private JwtUtil jwtUtil;
	private static final String SECRET = "c2lsdmVybmluZS10ZWNoLXNwcmluZy1ib290LWp3dC10dXRvcmlhbC1zZWNyZXQtc2lsdmVybmluZS10ZWNoLXNwcmluZy1ib290LWp3dC10dXRvcmlhbC1zZWNyZXQK";
	private static final long EXPIRATION_TIME = 3600L; // 1시간

	private static final String EMAIL = "test@example.com";
	private static final RoleType ROLE_TYPE = RoleType.ROLE_USER;

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
			// when
			String token = jwtUtil.generateAccessToken(EMAIL, ROLE_TYPE);

			// then
			assertThat(token).isNotBlank();

			// 토큰 디코딩
			Claims claims = Jwts.parserBuilder()
					.setSigningKey(Keys.hmacShaKeyFor(Base64.getDecoder().decode(SECRET)))
					.build()
					.parseClaimsJws(token)
					.getBody();

			assertThat(claims.get("email", String.class)).isEqualTo(EMAIL);
			assertThat(claims.get("role", String.class)).isEqualTo(ROLE_TYPE.getValue());
		}
	}

	@Nested
	@DisplayName("AccessToken 검증 테스트")
	class ValidateTokenTests {

		@Test
		@DisplayName("정상적인 토큰이면 true를 반환한다.")
		void validateToken_success() {
			// given
			String token = jwtUtil.generateAccessToken(EMAIL, ROLE_TYPE);

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
			Assertions.assertThat(logEvent.getThrowable().get())
					.isInstanceOf(MalformedJwtException.class);
		}
	}

	@Test
	@DisplayName("만료된 토큰이면 false를 반환한다.")
	void validateToken_expiredToken() {
		LogCaptor logCaptor = LogCaptor.forClass(JwtUtil.class);  // LogCaptor로 로그 캡처 시작

		// given - 아주 짧은 만료 시간을 가진 토큰 생성
		JwtUtil shortLivedJwtUtil = new JwtUtil(SECRET, 1L); // 1초만 유효
		String token = shortLivedJwtUtil.generateAccessToken(EMAIL, ROLE_TYPE);

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
		Assertions.assertThat(logEvent.getThrowable().get())
				.isInstanceOf(ExpiredJwtException.class);
	}

	@Test
	@DisplayName("AccessToken에 id와 role이 정확히 저장된다.")
	void generateAccessToken_containsClaims() {
		// given
		String token = jwtUtil.generateAccessToken(EMAIL, ROLE_TYPE);

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