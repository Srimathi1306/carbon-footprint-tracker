package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.*;


import java.util.List;

public interface UserService {

    // Authentication
    UserResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    // Admin User Management
    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    UserResponse createUser(UserRequestDTO request);

    UserResponse updateUser(Long id, UpdateUserRequest request);

    void deleteUser(Long id);

    // User Profile
    UserResponse getUserByEmail(String email);

    UserResponse updateProfile(String email, UpdateProfileRequest request);
}