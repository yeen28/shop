package com.shop.api.service;

import com.shop.common.model.ProductDto;
import com.shop.common.model.ProductModel;
import com.shop.common.domain.Product;
import com.shop.api.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProductService {
	private final ProductRepository productRepository;

	public ProductModel getProduct(final String productId) {
		Product product = productRepository.findById(productId).orElseThrow(EntityNotFoundException::new);
		return ProductModel.of(product);
	}
}
