package lyhour.api.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lyhour.api.entities.Category;
import lyhour.api.entities.MenuItem;
import lyhour.api.repositories.MenuItemRepository;

@Service
public class UserMenuService {
    private final MenuItemRepository menuItemRepository;
    private final CategoryService categoryService;

    public UserMenuService(MenuItemRepository menuItemRepository, CategoryService categoryService) {
        this.menuItemRepository = menuItemRepository;
        this.categoryService = categoryService;
    }

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public List<Category> getAllCategory() {
        return categoryService.findAll();
    }

}
