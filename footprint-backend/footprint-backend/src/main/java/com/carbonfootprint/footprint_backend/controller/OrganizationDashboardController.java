package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.*;
import com.carbonfootprint.footprint_backend.service.OrganizationDashboardService;
import com.carbonfootprint.footprint_backend.service.OrganizationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/organization")
@RequiredArgsConstructor
public class OrganizationDashboardController {

    private final OrganizationDashboardService service;
    private final OrganizationService organizationService;

    @GetMapping("/dashboard")
    public ResponseEntity<OrganizationDashboardResponse> getDashboard(
            Authentication authentication) {

        return ResponseEntity.ok(
                service.getDashboard(authentication.getName())
        );
    }

    // Get all users belonging to the logged-in organization
    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getUsers(
            Authentication authentication) {

        return ResponseEntity.ok(
                service.getUsers(authentication.getName())
        );
    }

    // Create a user under the logged-in organization
    @PostMapping("/users")
    public ResponseEntity<UserResponse> createUser(
            Authentication authentication,
            @RequestBody UserRequestDTO request) {

        UserResponse response =
                service.createUser(
                        authentication.getName(),
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // Get a specific user
    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponse> getUser(
            Authentication authentication,
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.getUser(
                        authentication.getName(),
                        id
                )
        );
    }

    // Update a user
    @PutMapping("/users/{id}")
    public ResponseEntity<UserResponse> updateUser(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody UpdateUserRequest request) {

        return ResponseEntity.ok(
                service.updateUser(
                        authentication.getName(),
                        id,
                        request
                )
        );
    }

    // Delete a user
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(
            Authentication authentication,
            @PathVariable Long id) {

        service.deleteUser(
                authentication.getName(),
                id
        );

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/profile")
    public ResponseEntity<OrganizationResponse> getProfile(
            Authentication authentication) {

        return ResponseEntity.ok(
                organizationService.getProfile(
                        authentication.getName()
                )
        );
    }

    @PutMapping("/profile")
    public ResponseEntity<OrganizationResponse> updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateOrganizationRequest request) {

        return ResponseEntity.ok(
                organizationService.updateProfile(
                        authentication.getName(),
                        request
                )
        );
    }
}