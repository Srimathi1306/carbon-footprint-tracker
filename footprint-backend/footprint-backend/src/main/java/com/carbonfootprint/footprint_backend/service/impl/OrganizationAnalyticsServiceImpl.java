package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.dto.OrganizationAnalyticsResponse;
import com.carbonfootprint.footprint_backend.entity.Organization;
import com.carbonfootprint.footprint_backend.repository.ActivityRepository;
import com.carbonfootprint.footprint_backend.repository.OrganizationRepository;
import com.carbonfootprint.footprint_backend.service.OrganizationAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrganizationAnalyticsServiceImpl
        implements OrganizationAnalyticsService {

    private final ActivityRepository activityRepository;
    private final OrganizationRepository organizationRepository;

    @Override
    public OrganizationAnalyticsResponse getAnalytics(
            String organizationEmail) {

        Organization organization =
                organizationRepository.findByEmail(organizationEmail)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Organization not found"
                                ));

        Long organizationId = organization.getId();

        Long totalActivities =
                activityRepository.countByOrganizationId(
                        organizationId
                );

        Double totalCarbonEmission =
                activityRepository
                        .getTotalCarbonEmissionByOrganizationId(
                                organizationId
                        );

        List<OrganizationAnalyticsResponse.CategoryEmission>
                categoryEmissions =
                activityRepository
                        .getOrganizationEmissionByCategory(
                                organizationId
                        )
                        .stream()
                        .map(row ->
                                OrganizationAnalyticsResponse.CategoryEmission
                                        .builder()
                                        .category((String) row[0])
                                        .carbonEmission(
                                                ((Number) row[1]).doubleValue()
                                        )
                                        .build()
                        )
                        .toList();

        List<OrganizationAnalyticsResponse.MonthlyEmission>
                monthlyEmissions =
                activityRepository
                        .getOrganizationMonthlyEmission(
                                organizationId
                        )
                        .stream()
                        .map(row ->
                                OrganizationAnalyticsResponse.MonthlyEmission
                                        .builder()
                                        .year(((Number) row[0]).intValue())
                                        .month(((Number) row[1]).intValue())
                                        .carbonEmission(
                                                ((Number) row[2]).doubleValue()
                                        )
                                        .build()
                        )
                        .toList();

        List<OrganizationAnalyticsResponse.UserEmission>
                userEmissions =
                activityRepository
                        .getOrganizationEmissionByUser(
                                organizationId
                        )
                        .stream()
                        .map(row ->
                                OrganizationAnalyticsResponse.UserEmission
                                        .builder()
                                        .userName((String) row[0])
                                        .carbonEmission(
                                                ((Number) row[1]).doubleValue()
                                        )
                                        .build()
                        )
                        .toList();

        return OrganizationAnalyticsResponse.builder()
                .totalActivities(totalActivities)
                .totalCarbonEmission(
                        Math.round(
                                totalCarbonEmission * 100.0
                        ) / 100.0
                )
                .categoryEmissions(categoryEmissions)
                .monthlyEmissions(monthlyEmissions)
                .userEmissions(userEmissions)
                .build();
    }
}