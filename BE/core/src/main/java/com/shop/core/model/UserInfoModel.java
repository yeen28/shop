package com.shop.core.model;

import com.shop.core.domain.UserInfo;
import lombok.Builder;

import java.util.List;

@Builder
public class UserInfoModel {
	private String email;

	public static UserInfoModel of(UserInfo userInfo) {
		return UserInfoModel.builder()
				.email(userInfo.getEmail())
				.build();
	}

	public static List<UserInfoModel> of(List<UserInfo> userInfos) {
		return userInfos.stream().map(UserInfoModel::of).toList();
	}
}
