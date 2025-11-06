package lyhour.api.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lyhour.api.commons.dtos.responses.AuthResponseDto;
import lyhour.api.entities.User;

@Service
public class AuthService {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public AuthResponseDto register(String username, String rawPassword) {
        User existingUser = userService.findByUsername(username);
        if (existingUser != null) {
            throw new IllegalArgumentException("Username already exists");
        }

        String hashedPassword = passwordEncoder.encode(rawPassword);
        User user = userService.registerUser(username, hashedPassword);

        String token = jwtService.generateToken(user);

        return new AuthResponseDto(token, user);
    }

    public AuthResponseDto login(String username, String rawPassword) {
        User user = userService.findByUsername(username);
        if (user == null || !passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new IllegalArgumentException("Invalid Credential");
        }
        String token = jwtService.generateToken(user);
        return new AuthResponseDto(token, user);
    }

}
