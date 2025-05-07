package com.shop.api.model;

import com.shop.core.domain.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring") // componentModel = "spring" 옵션을 주면 Spring Bean으로 자동 등록됩니다.
public interface ProductMapper {
	Product toEntity(ProductDto productDto);
	ProductDto toDto(Product product);
}
