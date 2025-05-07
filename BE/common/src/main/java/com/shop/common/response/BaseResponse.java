package com.shop.common.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

/**
 * API 응답 표준화
 */
@Builder
public record BaseResponse(
		Boolean isSuccess,
		@JsonInclude(JsonInclude.Include.NON_NULL) Object data,
		@JsonInclude(JsonInclude.Include.NON_NULL) String errorMessage,
		@JsonInclude(JsonInclude.Include.NON_NULL) int errorCode,
		@JsonInclude(JsonInclude.Include.NON_NULL) long timestamp
) {
	@JsonCreator
	public BaseResponse(
			@JsonProperty("isSuccess") Boolean isSuccess,
			@JsonProperty("data") Object data,
			@JsonProperty("errorMessage") String errorMessage,
			@JsonProperty("errorCode") int errorCode,
			@JsonProperty("timestamp") long timestamp
	) {
		this.isSuccess = isSuccess;
		this.data = data;
		this.errorMessage = errorMessage;
		this.errorCode = errorCode;
		this.timestamp = timestamp;
	}

	public static BaseResponse success() {
		return success(SuccessCode.OK);
	}

	public static BaseResponse success(Object data) {
		return BaseResponse.builder()
				.isSuccess(true)
				.data(data)
				.build();
	}

	public static BaseResponse fail(ErrorCode code) {
		return BaseResponse.builder()
				.isSuccess(false)
				.errorMessage(code.getMessage())
				.errorCode(code.getCode())
				.timestamp(System.currentTimeMillis())
				.build();
	}
}
