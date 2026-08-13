package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.*;

public interface OrganizationService {

    OrganizationLoginResponse login(
            OrganizationLoginRequest request
    );

    OrganizationResponse register(OrganizationRegisterRequest request);

    OrganizationResponse getProfile(
            String organizationEmail
    );

    OrganizationResponse updateProfile(
            String organizationEmail,
            UpdateOrganizationRequest request
    );
}