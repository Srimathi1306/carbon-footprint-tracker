package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.CategoryRequest;
import com.carbonfootprint.footprint_backend.dto.CategoryResponse;
import com.carbonfootprint.footprint_backend.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/categories")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> addCategory(
            @Valid @RequestBody CategoryRequest request) {

        return new ResponseEntity<>(
                service.addCategory(request),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {

        return ResponseEntity.ok(
                service.getAllCategories()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.getCategoryById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequest request) {

        return ResponseEntity.ok(
                service.updateCategory(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(
            @PathVariable Long id) {

        service.deleteCategory(id);

        return ResponseEntity.ok("Category deleted successfully.");
    }
}