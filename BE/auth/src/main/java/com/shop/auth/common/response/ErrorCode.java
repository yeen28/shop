package com.shop.auth.common.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
	INVALID_ACCESS_PATH(100, "Invalid access path."),
	NO_SEARCH_RESULTS(302, "There are no search results."),
	DATA_PROCESSING_ERROR(400, "An error occurred while processing data."),
	UNDEFINED_ERROR(500, "An undefined error has occurred"),

	INVALID_INPUT(1001, "Invalid Input"),
	ENTITY_NOT_FOUND(1003, "Entity not found"),
	INTERNAL_SERVER_ERROR(1004, "Internal Server Error"),
	ACCESS_DENIED(1006, "Access Denied"),
	FORBIDDEN_ACCESS(1007, "Forbidden access"),

	UNSUPPORTED_HEADER(1010, "Unsupported Header");

	private final int code;
	private final String message;
}
