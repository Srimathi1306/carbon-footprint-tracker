package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.RegisterRequest;
import com.carbonfootprint.footprint_backend.dto.UpdateProfileRequest;
import com.carbonfootprint.footprint_backend.dto.UserResponse;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // Logged in user profile
    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(Authentication authentication) {

        return ResponseEntity.ok(
                service.getUserByEmail(authentication.getName())
        );
    }

    // Update logged in user profile
    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request) {

        return ResponseEntity.ok(
                service.updateProfile(authentication.getName(), request)
        );
    }

}