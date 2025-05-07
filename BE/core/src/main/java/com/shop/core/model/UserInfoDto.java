package com.shop.core.model;

import lombok.*;

@Builder
public record UserInfoDto(String email, String password) {}