package com.shop.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@SpringBootApplication(
		scanBasePackages = {"com.shop.api", "com.shop.auth"}
)
@EntityScan(basePackages = {"com.shop.auth.domain"})
@EnableJpaRepositories(basePackages = {"com.shop.auth.repository"})
public class ApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}
}