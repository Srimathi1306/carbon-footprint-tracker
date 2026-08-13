package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.OrganizationLoginRequest;
import com.carbonfootprint.footprint_backend.dto.OrganizationLoginResponse;
import com.carbonfootprint.footprint_backend.dto.OrganizationRegisterRequest;
import com.carbonfootprint.footprint_backend.dto.OrganizationResponse;
import com.carbonfootprint.footprint_backend.service.OrganizationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/organization/auth")
@RequiredArgsConstructor
public class OrganizationAuthController {

    private final OrganizationService organizationService;

    @PostMapping("/register")
    public ResponseEntity<OrganizationResponse> register(
            @Valid @RequestBody OrganizationRegisterRequest request) {

        OrganizationResponse response =
                organizationService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<OrganizationLoginResponse> login(
            @Valid @RequestBody OrganizationLoginRequest request) {

        OrganizationLoginResponse response =
                organizationService.login(request);

        return ResponseEntity.ok(response);
    }
}
