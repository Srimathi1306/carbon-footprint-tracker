package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.OrganizationDashboardResponse;
import com.carbonfootprint.footprint_backend.dto.UserRequestDTO;
import com.carbonfootprint.footprint_backend.dto.UserResponse;

import java.util.List;

import com.carbonfootprint.footprint_backend.dto.UpdateUserRequest;

public interface OrganizationDashboardService {

    OrganizationDashboardResponse getDashboard(
            String organizationEmail
    );

    List<UserResponse> getUsers(String organizationEmail);

    UserResponse createUser(
            String organizationEmail,
            UserRequestDTO request
    );

    UserResponse getUser(
            String organizationEmail,
            Long userId
    );

    UserResponse updateUser(
            String organizationEmail,
            Long userId,
            UpdateUserRequest request
    );

    void deleteUser(
            String organizationEmail,
            Long userId
    );

}
