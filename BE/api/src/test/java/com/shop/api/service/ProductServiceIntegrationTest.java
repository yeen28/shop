package com.shop.api.service;

import com.shop.api.model.ProductModel;
import com.shop.core.domain.Product;
import com.shop.core.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
// @SpringBootTest 를 사용하는 테스트에서는 @ComponentScan, @EnableJpaRepositories, @EntityScan을 수동으로 지정 가능
@EnableJpaRepositories(basePackages = "com.shop.api.repository")
@EntityScan(basePackages = "com.shop.common.domain")
@ActiveProfiles("test") // application-test.yml 사용
class ProductServiceIntegrationTest {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private ProductService productService;

	@BeforeEach
	void setUp() {
		productRepository.deleteAll();

		productRepository.saveAll(List.of(
				Product.builder().name("A").price(1000).category("it").build(),
				Product.builder().name("B").price(1000).category("it").build(),
				Product.builder().name("C").price(1000).category("it").build()
		));
	}

	@Test
	void get_product_test() {
		// when
		ProductModel product = productService.getProduct("1");

		// then
		assertEquals("A", product.getName());
	}
}