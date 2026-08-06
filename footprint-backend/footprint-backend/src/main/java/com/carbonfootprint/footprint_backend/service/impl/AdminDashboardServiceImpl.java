package com.carbonfootprint.footprint_backend.service.impl;


import com.carbonfootprint.footprint_backend.dto.ActivityResponse;
import com.carbonfootprint.footprint_backend.dto.AdminDashboardDTO;
import com.carbonfootprint.footprint_backend.dto.UserResponse;
import com.carbonfootprint.footprint_backend.entity.Activity;
import com.carbonfootprint.footprint_backend.entity.EmissionFactor;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.repository.ActivityRepository;
import com.carbonfootprint.footprint_backend.repository.UserRepository;
import com.carbonfootprint.footprint_backend.service.AdminDashboardService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminDashboardServiceImpl implements AdminDashboardService {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;

    public AdminDashboardServiceImpl(
            UserRepository userRepository,
            ActivityRepository activityRepository
    ) {
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
    }

    @Override
    public AdminDashboardDTO getDashboard() {

        long totalUsers = userRepository.count();

        long totalActivities = activityRepository.count();

        Double totalCarbon = activityRepository.getTotalCarbonEmission();

        List<UserResponse> recentUsers = userRepository.findTop5ByOrderByIdDesc()
                .stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .role(user.getRole().name())
                        .build()
                )
                .toList();

        List<ActivityResponse> recentActivities = activityRepository
                .findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(activity -> {
                    EmissionFactor factor = activity.getEmissionFactor();

                    return ActivityResponse.builder()
                            .id(activity.getId())
                            .emissionFactorId(factor.getId())
                            .category(factor.getCategory().getName())
                            .activityType(factor.getActivityType())
                            .unit(factor.getUnit())
                            .quantity(activity.getQuantity())
                            .carbonEmission(activity.getCarbonEmission())
                            .activityDate(activity.getActivityDate())
                            .build();
                })
                .toList();

        return new AdminDashboardDTO(
                totalUsers,
                totalActivities,
                totalCarbon == null ? 0 : totalCarbon,
                recentUsers,
                recentActivities
        );
    }
}