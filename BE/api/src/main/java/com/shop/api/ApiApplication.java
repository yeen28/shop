package com.shop.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(
		scanBasePackages = {"com.shop"}
)
@EntityScan(basePackages = {"com.shop.auth.domain"})
@EnableJpaRepositories(basePackages = {"com.shop.auth.repository"})
@EntityScan(basePackages = {"com.shop.auth.domain", "com.shop.common.domain"})
@EnableJpaRepositories(basePackages = {"com.shop"})
public class ApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}
}