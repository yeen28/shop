package com.shop.api.service;

import com.shop.api.model.ProductDto;
import com.shop.api.model.ProductMapper;
import com.shop.api.model.ProductModel;
import com.shop.core.domain.Product;
import com.shop.core.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Mapper 사용 경험을 위해 ProductService만 api 모듈에 두었습니다.
 */
@RequiredArgsConstructor
@Service
public class ProductService {
	private final ProductRepository productRepository;
	private final ProductMapper productMapper;

	public ProductModel getProduct(final String productId) {
		Product product = productRepository.findById(productId).orElseThrow(EntityNotFoundException::new);
		return ProductModel.of(product);
	}

	public void addProduct(ProductDto productDto) {
		productRepository.save(productMapper.toEntity(productDto));
	}
}
