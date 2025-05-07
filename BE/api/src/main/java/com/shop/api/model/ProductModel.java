package com.shop.api.model;

import com.shop.core.domain.Product;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductModel {
	private String name;
	private int price;
	private String category;

	public static ProductModel of(Product product) {
		return ProductModel.builder()
				.name(product.getName())
				.price(product.getPrice())
				.category(product.getCategory())
				.build();
	}
}
