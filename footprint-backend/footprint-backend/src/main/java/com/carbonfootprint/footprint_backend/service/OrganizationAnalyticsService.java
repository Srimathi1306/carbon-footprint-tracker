package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.OrganizationAnalyticsResponse;

public interface OrganizationAnalyticsService {

    OrganizationAnalyticsResponse getAnalytics(
            String organizationEmail
    );
}
