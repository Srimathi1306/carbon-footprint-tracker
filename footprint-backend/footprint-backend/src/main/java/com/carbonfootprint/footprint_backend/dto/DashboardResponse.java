package com.carbonfootprint.footprint_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    // Activity
    private Long totalActivities;
    private Double totalCarbonEmission;
    private Double averageCarbonEmission;

    // Today's Summary
    private Double todayEmission;
    private Double weeklyEmission;
    private Double monthlyEmission;

    // Gamification
    private Integer xp;
    private Integer currentStreak;
    private Integer longestStreak;
    private Integer badgeCount;

    // Goal
    private String activeGoalCategory;
    private Double goalProgress;

    // Missions
    private Integer completedDailyMissions;
    private Integer completedWeeklyMissions;

}