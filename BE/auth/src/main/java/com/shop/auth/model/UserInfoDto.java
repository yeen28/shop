package com.shop.auth.model;

import lombok.*;

@Builder
public record UserInfoDto(@Getter String email, @Getter String password) {}