package lyhour.api.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lyhour.api.commons.dtos.responses.BaseResponseDto;
import lyhour.api.entities.Category;
import lyhour.api.entities.MenuItem;
import lyhour.api.services.UserMenuService;

@RestController
@RequestMapping("/user-menus")
@Tag(name = "User Menus")
public class UserMenuController {

    private final UserMenuService userMenuService;

    public UserMenuController(UserMenuService userMenuService) {
        this.userMenuService = userMenuService;
    }

    @GetMapping()
    public BaseResponseDto<List<MenuItem>> findAll() {
        return BaseResponseDto.success(userMenuService.getAllMenuItems(), "Success");
    }

    @GetMapping("/categories")
    public BaseResponseDto<List<Category>> getAllCategory() {
        return BaseResponseDto.success(userMenuService.getAllCategory(), "Success");
    }
}