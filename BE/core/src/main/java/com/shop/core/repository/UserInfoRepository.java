package com.shop.core.repository;

import com.shop.core.domain.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
	UserInfo findByEmail(String email);
}