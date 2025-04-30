package com.shop.auth.model;

import lombok.*;

@Builder
public record UserInfoDto(String email, String password) {}