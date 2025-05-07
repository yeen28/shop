package com.shop.common.auth.util;

import com.shop.common.auth.type.RoleType;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {
	private final Key key;
	private final long accessTokenExpTime;

	public JwtUtil(
			@Value("${jwt.secret}") final String secret,
			@Value("${jwt.expiration-time}") final long accessTokenExpTime
	) {
		byte[] key = Decoders.BASE64.decode(secret);
		this.key = Keys.hmacShaKeyFor(key);
		this.accessTokenExpTime = accessTokenExpTime;
	}

	/**
	 * Generate Access Token
	 * @return Access Token String
	 */
	public String generateAccessToken(final String email, final RoleType role) {
		// Generate JWT
		Claims claims = Jwts.claims();
		claims.put("email", email);
		claims.put("role", role);

		ZonedDateTime now = ZonedDateTime.now();

		return Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(Date.from(now.toInstant()))
				.setExpiration(Date.from(now.plusSeconds(accessTokenExpTime).toInstant()))
				.signWith(key, SignatureAlgorithm.HS512)
				.compact();
	}

	/**
	 * Validate JWT
	 */
	public boolean validateToken(String token) {
		try {
			// parseClaimsJws() : 서명이 있는 JWT를 검증하고 파싱합니다.(대부분 경우 보안 때문에 서명된 JWS를 사용)
			// parseClaimsJwt() : 서명이 없는 JWT만 파싱합니다.(이건 거의 안 씁니다.)
			Jwts.parserBuilder()
					.setSigningKey(key)
					.build()
					.parseClaimsJws(token);
			return true;

		} catch (SecurityException | MalformedJwtException e) {
			log.info("Invalid JWT Token - {}", token, e);
		} catch (ExpiredJwtException e) {
			log.info("Expired JWT Token - {}", token, e);
		} catch (UnsupportedJwtException e) {
			log.info("Unsupported JWT Token - {}", token, e);
		} catch (IllegalArgumentException e) {
			log.info("JWT claims string is empty - {}", token, e);
		}

		return false;
	}
}