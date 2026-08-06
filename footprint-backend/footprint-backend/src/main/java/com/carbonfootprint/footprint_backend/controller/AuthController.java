package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.LoginRequest;
import com.carbonfootprint.footprint_backend.dto.LoginResponse;
import com.carbonfootprint.footprint_backend.dto.RegisterRequest;
import com.carbonfootprint.footprint_backend.dto.UserResponse;
import com.carbonfootprint.footprint_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(
            @Valid @RequestBody RegisterRequest request) {
        System.out.println("===== REGISTER CONTROLLER HIT =====");

        UserResponse user = service.register(request);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {
        System.out.println("===== LOGIN CONTROLLER HIT =====");
        LoginResponse response = service.login(request);

        return ResponseEntity.ok(response);
    }

}