package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.dto.*;
import com.carbonfootprint.footprint_backend.entity.Organization;
import com.carbonfootprint.footprint_backend.repository.OrganizationRepository;
import com.carbonfootprint.footprint_backend.service.OrganizationService;
import com.carbonfootprint.footprint_backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrganizationServiceImpl implements OrganizationService {

    private final OrganizationRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public OrganizationLoginResponse login(
            OrganizationLoginRequest request) {

        Organization organization = repository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid Email"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                organization.getPassword())) {

            throw new RuntimeException("Invalid Password");
        }

//        String token = jwtService.generateToken(
//                organization.getEmail());

        String token = jwtService.generateToken(
                organization.getEmail(),
                "ORGANIZATION"
        );

        OrganizationResponse response =
                OrganizationResponse.builder()
                        .id(organization.getId())
                        .name(organization.getName())
                        .email(organization.getEmail())
                        .build();

        return new OrganizationLoginResponse(
                token,
                "Organization Login Successful",
                response
        );
    }

    @Override
    public OrganizationResponse register(
            OrganizationRegisterRequest request) {

        if (repository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Organization organization = new Organization();

        organization.setName(request.getName());
        organization.setEmail(request.getEmail());

        organization.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        Organization savedOrganization =
                repository.save(organization);

        return OrganizationResponse.builder()
                .id(savedOrganization.getId())
                .name(savedOrganization.getName())
                .email(savedOrganization.getEmail())
                .build();
    }

    @Override
    public OrganizationResponse getProfile(String organizationEmail) {

        Organization organization =
                repository.findByEmail(organizationEmail)
                        .orElseThrow(() ->
                                new RuntimeException("Organization not found"));

        return OrganizationResponse.builder()
                .id(organization.getId())
                .name(organization.getName())
                .email(organization.getEmail())
                .build();
    }

    @Override
    public OrganizationResponse updateProfile(
            String organizationEmail,
            UpdateOrganizationRequest request) {

        Organization organization =
                repository.findByEmail(organizationEmail)
                        .orElseThrow(() ->
                                new RuntimeException("Organization not found"));

        // Check whether the new email is already used
        // by another organization
        if (!organization.getEmail().equals(request.getEmail())
                && repository.existsByEmail(request.getEmail())) {

            throw new RuntimeException("Email already exists");
        }

        organization.setName(request.getName());
        organization.setEmail(request.getEmail());

        // Password is optional
        if (request.getPassword() != null
                && !request.getPassword().isBlank()) {

            organization.setPassword(
                    passwordEncoder.encode(request.getPassword())
            );
        }

        Organization savedOrganization =
                repository.save(organization);

        return OrganizationResponse.builder()
                .id(savedOrganization.getId())
                .name(savedOrganization.getName())
                .email(savedOrganization.getEmail())
                .build();
    }
}
