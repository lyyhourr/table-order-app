package lyhour.api.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lyhour.api.commons.dtos.responses.BaseResponseDto;
import lyhour.api.entities.User;
import lyhour.api.services.UserService;

@RestController
@RequestMapping("/users")
@Tag(name = "Users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public BaseResponseDto<List<User>> getAllUsers() {
        return BaseResponseDto.success(userService.getAllUsers(), "Success");
    }
}
