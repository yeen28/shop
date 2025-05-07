package com.shop.core.service;

import com.shop.common.CookieUtils;
import com.shop.core.domain.UserInfo;
import com.shop.core.model.SignupUserInfoDto;
import com.shop.core.model.UserInfoDto;
import com.shop.core.repository.UserInfoRepository;
import com.shop.common.auth.type.RoleType;
import com.shop.common.auth.util.JwtUtil;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/*
아래 코드를 @ExtendWith 어노테이션으로 대체
@BeforeEach
void setUp() {
	MockitoAnnotations.openMocks(this);
}
 */
@ExtendWith(MockitoExtension.class)
class UserInfoServiceTest {
	@Mock
	private UserInfoRepository userInfoRepository;
	@Mock
	private PasswordEncoder passwordEncoder;
	@Mock
	private JwtUtil jwtUtil;
	@InjectMocks
	private UserInfoService userInfoService;

	@Test
	@DisplayName("로그인 성공 시 사용자 정보 조회 성공")
	void login_test() {
		// given
		UserInfoDto userInfoDto = new UserInfoDto("test@example.com", "password123");
		UserInfo userInfo = UserInfo.of(userInfoDto.email(), passwordEncoder.encode(userInfoDto.password()), RoleType.ROLE_USER);

		when(userInfoRepository.findByEmail(userInfoDto.email())).thenReturn(userInfo);

		// getAccessToken은 내부 메서드이므로 spy 사용
		UserInfoService spyUserInfoService = Mockito.spy(userInfoService);
		doReturn("mocked-access-token").when(spyUserInfoService).getAccessToken(anyString(), any(UserInfo.class));

		// MockedStatic< T > 객체는 AutoCloseable 인터페이스를 구현
		try (MockedStatic<CookieUtils> mockedStatic = mockStatic(CookieUtils.class)) {
			// when
			String accessToken = spyUserInfoService.login(userInfoDto);

			// then
			assertNotNull(accessToken);
			assertEquals("mocked-access-token", accessToken);
			mockedStatic.verify(() -> CookieUtils.setCookie("login", accessToken));
		}
	}

	@Test
	@DisplayName("로그인 성공 시 AccessToken 반환")
	void getAccessToken_test() {
		// given
		String dtoEmail = "test@example.com";
		String dtoPassword = "password123";
		UserInfo userInfo = UserInfo.of(dtoEmail, passwordEncoder.encode(dtoPassword), RoleType.ROLE_USER);

		when(passwordEncoder.matches(dtoPassword, userInfo.getPassword())).thenReturn(true);
		when(jwtUtil.generateAccessToken(userInfo.getEmail(), userInfo.getRole())).thenReturn("mocked-access-token");

		// when
		String accessToken = userInfoService.getAccessToken(dtoPassword, userInfo);

		// then
		assertNotNull(accessToken);
		assertEquals("mocked-access-token", accessToken);
	}

	@Test
	@DisplayName("DB에 저장된 User email이 존재하지 않을 때 UsernameNotFoundException 발생")
	void login_fail_usernameNotFound() {
		// given
		String email = "wrongEmail@example.com";
		UserInfoDto wrongUserInfoDto = new UserInfoDto(email, "wrongPassword");

		when(userInfoRepository.findByEmail(email)).thenReturn(null);

		// when & then
		assertThrows(UsernameNotFoundException.class, () -> userInfoService.login(wrongUserInfoDto));
	}

	@Test
	@DisplayName("비밀번호가 일치하지 않을 때 BadCredentialsException 발생")
	void login_fail_badCredentials() {
		// given
		String email = "test@example.com";
		String dtoPassword = "wrongPassword";
		String dbPassword = "dbPassword";
		UserInfo dbUserInfo = UserInfo.of(email, passwordEncoder.encode(dbPassword), RoleType.ROLE_USER);

		// when & then
		assertThrows(BadCredentialsException.class, () -> userInfoService.getAccessToken(dtoPassword, dbUserInfo));
	}

	@Test
	@DisplayName("회원 저장: 비밀번호 암호화 및 ROLE_USER 설정 후 저장됨")
	void signup_userInfo_success() {
		// given
		String email = "test@example.com";
		String plainPassword = "plainPassword";
		String encodedPassword = "encodedPassword";
		SignupUserInfoDto dto = new SignupUserInfoDto(email, plainPassword, RoleType.ROLE_USER);

		when(passwordEncoder.encode(plainPassword)).thenReturn(encodedPassword);

		// when
		userInfoService.signup(dto);

		// then
		// ArgumentCaptor로 userInfoRepository.save()에 전달된 UserInfo 객체를 검증
		ArgumentCaptor<UserInfo> captor = ArgumentCaptor.forClass(UserInfo.class);
		verify(userInfoRepository).save(captor.capture());

		UserInfo savedUser = captor.getValue();
		assertEquals(encodedPassword, savedUser.getPassword());
		assertEquals(email, savedUser.getEmail());
		assertEquals(RoleType.ROLE_USER, savedUser.getRole());
	}
}