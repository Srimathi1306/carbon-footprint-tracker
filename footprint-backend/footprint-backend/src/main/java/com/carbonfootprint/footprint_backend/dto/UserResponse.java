package com.carbonfootprint.footprint_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private Long id;
    private String name;
    private String username;
    private String email;
    private String role;

    private Integer xp;

    private Integer currentStreak;

    private Integer longestStreak;

    private Long totalActivities;

    private Double totalCarbonEmission;

    private Integer badgeCount;

    private Integer completedGoals;

}