package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.CategoryRequest;
import com.carbonfootprint.footprint_backend.dto.CategoryResponse;

import java.util.List;

public interface CategoryService {

    CategoryResponse addCategory(CategoryRequest request);

    List<CategoryResponse> getAllCategories();

    CategoryResponse getCategoryById(Long id);

    CategoryResponse updateCategory(Long id, CategoryRequest request);

    void deleteCategory(Long id);
}