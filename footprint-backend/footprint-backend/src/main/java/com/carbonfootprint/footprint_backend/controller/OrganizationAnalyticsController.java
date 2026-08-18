package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.OrganizationAnalyticsResponse;
import com.carbonfootprint.footprint_backend.service.OrganizationAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/organization/analytics")
@RequiredArgsConstructor
public class OrganizationAnalyticsController {

    private final OrganizationAnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<OrganizationAnalyticsResponse> getAnalytics(
            Authentication authentication) {

        return ResponseEntity.ok(
                analyticsService.getAnalytics(
                        authentication.getName()
                )
        );
    }
}