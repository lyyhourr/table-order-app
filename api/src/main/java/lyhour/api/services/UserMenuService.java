package lyhour.api.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lyhour.api.entities.MenuItem;
import lyhour.api.repositories.MenuItemRepository;

@Service
public class UserMenuService {
    private final MenuItemRepository menuItemRepository;

    public UserMenuService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

}
