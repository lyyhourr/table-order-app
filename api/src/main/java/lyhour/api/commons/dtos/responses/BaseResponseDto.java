package lyhour.api.commons.dtos.responses;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseResponseDto<T> {

    private boolean success;
    private int status;
    private String message;
    private T data;

    public BaseResponseDto(boolean success, int status, String message, T data) {
        this.success = success;
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }

    public static <T> BaseResponseDto<T> success(T data) {
        return success(data, "success");
    }

    public static <T> BaseResponseDto<T> success(T data, String message) {
        return new BaseResponseDto<>(true, 200, message, data);
    }

    public static <T> BaseResponseDto<T> fail(int status) {
        return fail(status, "error");
    }

    public static <T> BaseResponseDto<T> fail(int status, String message) {
        return new BaseResponseDto<>(false, status, message, null);
    }

}
