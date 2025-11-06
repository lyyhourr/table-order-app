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
import lyhour.api.commons.dtos.requests.CategoryDto;
import lyhour.api.commons.dtos.responses.BaseResponseDto;
import lyhour.api.entities.Category;
import lyhour.api.services.CategoryService;

@RestController
@RequestMapping("/categories")
@Tag(name = "Categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public BaseResponseDto<List<Category>> findAll() {
        List<Category> categories = categoryService.findAll();
        return BaseResponseDto.success(categories);
    }

    @GetMapping("/{id}")
    public BaseResponseDto<Category> findById(@PathVariable Long id) {
        return categoryService.findById(id)
                .map(category -> BaseResponseDto.success(category))
                .orElseGet(() -> BaseResponseDto.fail(404));
    }

    @PostMapping
    public BaseResponseDto<Category> create(@RequestBody @Valid CategoryDto categoryDto) {
        Category savedCategory = categoryService.create(categoryDto);
        return BaseResponseDto.success(savedCategory);
    }

    @PutMapping("/{id}")
    public BaseResponseDto<Category> update(@PathVariable Long id,
            @RequestBody @Valid CategoryDto categoryDto) {
        Category updatedCategory = categoryService.update(id, categoryDto);
        return BaseResponseDto.success(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public BaseResponseDto<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return BaseResponseDto.success(null);
    }
}
