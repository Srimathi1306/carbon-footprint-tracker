package com.carbonfootprint.footprint_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardDTO {

    private long totalUsers;

    private long totalActivities;

    private double totalCarbonEmission;

    private List<UserResponse> recentUsers;

    private List<ActivityResponse> recentActivities;

}