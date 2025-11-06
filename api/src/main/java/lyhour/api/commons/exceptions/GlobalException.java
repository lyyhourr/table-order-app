package lyhour.api.commons.exceptions;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.EntityNotFoundException;
import lyhour.api.commons.dtos.responses.BaseResponseDto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.access.AccessDeniedException;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Hidden
@RestControllerAdvice
public class GlobalException {

    @Hidden
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<BaseResponseDto<Void>> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(BaseResponseDto.fail(400, ex.getMessage()));
    }

    @Hidden
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<BaseResponseDto<Void>> handleUnauthorized(BadCredentialsException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(BaseResponseDto.fail(401, ex.getMessage()));
    }

    @Hidden
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<BaseResponseDto<Void>> handleForbidden(AccessDeniedException ex) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(BaseResponseDto.fail(403, ex.getMessage()));
    }

    @Hidden
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<BaseResponseDto<Void>> handleNotFound(EntityNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(BaseResponseDto.fail(404, ex.getMessage()));
    }

    @Hidden
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<BaseResponseDto<Void>> handleValidation(MethodArgumentNotValidException ex) {
        String msg = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .findFirst()
                .orElse("Validation failed");

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(BaseResponseDto.fail(400, msg));
    }

    @Hidden
    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponseDto<Void>> handleAllExceptions(Exception ex) {
        ex.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(BaseResponseDto.fail(500, "Server error: " + ex.getMessage()));
    }
}
