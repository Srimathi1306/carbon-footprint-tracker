package com.carbonfootprint.footprint_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationDashboardResponse {

    private Long organizationId;
    private String organizationName;
    private String organizationEmail;

    private Long totalUsers;
    private Long totalActivities;
    private Double totalCarbonEmission;
    private Long totalBadges;
    private Long completedGoals;
}
