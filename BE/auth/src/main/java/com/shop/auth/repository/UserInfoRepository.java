package com.shop.auth.repository;

import com.shop.auth.domain.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
	UserInfo findByEmail(String email);
}