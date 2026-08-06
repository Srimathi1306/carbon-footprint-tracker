package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.RegisterRequest;
import com.carbonfootprint.footprint_backend.dto.UpdateUserRequest;
import com.carbonfootprint.footprint_backend.dto.UserRequestDTO;
import com.carbonfootprint.footprint_backend.dto.UserResponse;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserService service;

    public AdminController(UserService service) {
        this.service = service;
    }

    // ADMIN - Get all users
    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(service.getAllUsers());
    }

    // ADMIN - Get user by ID
    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getUserById(id));
    }

    // ADMIN - Delete user
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {

        service.deleteUser(id);

        return ResponseEntity.ok("User deleted successfully");
    }
    @PostMapping("/users")
    public ResponseEntity<UserResponse> createUser(
            @RequestBody UserRequestDTO request) {

        return ResponseEntity.ok(
                service.createUser(request)
        );
    }
    @PutMapping("/users/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserRequest request) {

        return ResponseEntity.ok(
                service.updateUser(id, request)
        );
    }
}