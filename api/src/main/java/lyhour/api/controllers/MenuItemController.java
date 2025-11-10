package lyhour.api.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lyhour.api.commons.dtos.requests.MenuItemDto;
import lyhour.api.commons.dtos.responses.BaseResponseDto;
import lyhour.api.entities.MenuItem;
import lyhour.api.services.MenuItemService;

@RestController
@RequestMapping("/menu-items")
@Tag(name = "Menu Items")
public class MenuItemController {

    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @GetMapping()
    public BaseResponseDto<List<MenuItem>> findAll() {
        List<MenuItem> menuItems = menuItemService.findAll();
        return BaseResponseDto.success(menuItems);
    }

    @GetMapping("/{id}")
    public BaseResponseDto<MenuItem> findById(@PathVariable Long id) {
        MenuItem menuItem = menuItemService.findOne(id);
        return BaseResponseDto.success(menuItem);
    }

    @PostMapping()
    public BaseResponseDto<MenuItem> create(@RequestBody @Valid MenuItemDto menuItemDto) {
        MenuItem createdMenuItem = menuItemService.create(menuItemDto);
        return BaseResponseDto.success(createdMenuItem);
    }

    @PutMapping("/{id}")
    public BaseResponseDto<MenuItem> update(@PathVariable Long id,
            @RequestBody @Valid MenuItemDto menuItemDto) {
        MenuItem updatedMenuItem = menuItemService.update(id, menuItemDto);
        return BaseResponseDto.success(updatedMenuItem);
    }

    @DeleteMapping("/{id}")
    public BaseResponseDto<Void> delete(@PathVariable Long id) {
        menuItemService.delete(id);
        return BaseResponseDto.success(null);
    }

}
