package lyhour.api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lyhour.api.commons.decorators.CurrentUser;
import lyhour.api.commons.dtos.requests.LoginDto;
import lyhour.api.commons.dtos.requests.RegisterDto;
import lyhour.api.commons.dtos.responses.AuthResponseDto;
import lyhour.api.commons.dtos.responses.BaseResponseDto;
import lyhour.api.entities.User;
import lyhour.api.services.AuthService;

@RestController
@RequestMapping("/auth")
@Tag(name = "Auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public BaseResponseDto<AuthResponseDto> login(@Valid @RequestBody LoginDto loginDto) {
        AuthResponseDto response = authService.login(loginDto.getUsername(), loginDto.getPassword());
        return BaseResponseDto.success(response, "Login successful");
    }

    @PostMapping("/register")
    public BaseResponseDto<AuthResponseDto> register(@Valid @RequestBody RegisterDto registerDto) {
        AuthResponseDto response = authService.register(registerDto.getUsername(), registerDto.getPassword());
        return BaseResponseDto.success(response, "Registration successful");
    }

    @GetMapping("/profile")
    public BaseResponseDto<User> getProfile(@CurrentUser User user) {
        return BaseResponseDto.success(user, "Profile fetched successfully");
    }

}
