package lyhour.api.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
import lyhour.api.commons.dtos.requests.MenuItemDto;
import lyhour.api.entities.MenuItem;
import lyhour.api.repositories.CategoryRepository;
import lyhour.api.repositories.MenuItemRepository;

@Service
@Transactional
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final CategoryRepository categoryRepository;

    public MenuItemService(MenuItemRepository menuItemRepository,
            CategoryRepository categoryRepository) {
        this.menuItemRepository = menuItemRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<MenuItem> findAll() {
        return menuItemRepository.findAllByOrderByCreatedAtDesc();
    }

    public MenuItem findOne(Long id) {
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Menu item not found"));
    }

    public MenuItem create(MenuItemDto dto) {
        return saveOrUpdate(new MenuItem(), dto);
    }

    public MenuItem update(Long id, MenuItemDto dto) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Menu item not found"));
        return saveOrUpdate(menuItem, dto);
    }

    public void delete(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Menu item not found"));
        menuItemRepository.delete(menuItem);
    }

    private MenuItem saveOrUpdate(MenuItem menuItem, MenuItemDto dto) {
        menuItem.setName(dto.getName());
        menuItem.setImage(dto.getImage());
        menuItem.setDescription(dto.getDescription());
        menuItem.setPrice(dto.getPrice());
        menuItem.setAvailable(dto.getAvailable());

        if (dto.getCategoryId() != null) {
            menuItem.setCategory(
                    categoryRepository.findById(dto.getCategoryId())
                            .orElseThrow(() -> new EntityNotFoundException("Category not found")));
        }

        return menuItemRepository.save(menuItem);
    }
}
