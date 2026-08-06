package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.dto.CategoryRequest;
import com.carbonfootprint.footprint_backend.dto.CategoryResponse;
import com.carbonfootprint.footprint_backend.entity.Category;
import com.carbonfootprint.footprint_backend.repository.CategoryRepository;
import com.carbonfootprint.footprint_backend.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository repository;

    public CategoryServiceImpl(CategoryRepository repository) {
        this.repository = repository;
    }

    // Add Category
    @Override
    public CategoryResponse addCategory(CategoryRequest request) {

        if (repository.existsByNameIgnoreCase(request.getName())) {
            throw new RuntimeException("Category already exists.");
        }

        Category category = Category.builder()
                .name(request.getName())
                .build();

        category = repository.save(category);

        return mapToResponse(category);
    }

    // Get All Categories
    @Override
    public List<CategoryResponse> getAllCategories() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get Category By Id
    @Override
    public CategoryResponse getCategoryById(Long id) {

        Category category = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found."));

        return mapToResponse(category);
    }

    // Update Category
    @Override
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {

        Category category = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found."));

        category.setName(request.getName());

        category = repository.save(category);

        return mapToResponse(category);
    }

    // Delete Category
    @Override
    public void deleteCategory(Long id) {

        Category category = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found."));

        repository.delete(category);
    }

    private CategoryResponse mapToResponse(Category category) {

        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }
}
