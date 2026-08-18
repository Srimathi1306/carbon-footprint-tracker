package com.carbonfootprint.footprint_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationAnalyticsResponse {

    private Long totalActivities;

    private Double totalCarbonEmission;

    private List<CategoryEmission> categoryEmissions;

    private List<MonthlyEmission> monthlyEmissions;

    private List<UserEmission> userEmissions;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryEmission {
        private String category;
        private Double carbonEmission;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MonthlyEmission {
        private Integer year;
        private Integer month;
        private Double carbonEmission;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserEmission {
        private String userName;
        private Double carbonEmission;
    }
}