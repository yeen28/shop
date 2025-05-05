package com.shop.common.domain;

import com.shop.common.model.ProductDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED) // Product product = new Product()를 방지하고 Product.of(...)로만 사용하도록 유도
@AllArgsConstructor
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	private int price;
	private String category;

	public static Product of(ProductDto productDto) {
		return Product.builder()
				.name(productDto.name())
				.price(productDto.price())
				.category(productDto.category())
				.build();
	}
}
