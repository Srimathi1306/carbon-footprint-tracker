package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.dto.AdminDashboardResponse;
import com.carbonfootprint.footprint_backend.dto.DashboardResponse;
import com.carbonfootprint.footprint_backend.entity.Activity;
import com.carbonfootprint.footprint_backend.entity.Goal;
import com.carbonfootprint.footprint_backend.entity.MissionStatus;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.repository.*;
import com.carbonfootprint.footprint_backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final BadgeRepository badgeRepository;
    private final GoalRepository goalRepository;
    private final DailyMissionRepository dailyMissionRepository;
    private final WeeklyMissionRepository weeklyMissionRepository;

    @Override
    public DashboardResponse getDashboard(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Activity> activities =
                activityRepository.findByUser(user);

        long totalActivities = activities.size();

        double totalCarbonEmission =
                activities.stream()
                        .mapToDouble(Activity::getCarbonEmission)
                        .sum();

        double averageCarbonEmission =
                totalActivities == 0
                        ? 0
                        : totalCarbonEmission / totalActivities;

        LocalDate today = LocalDate.now();

        double todayEmission =
                activities.stream()
                        .filter(a -> a.getActivityDate().equals(today))
                        .mapToDouble(Activity::getCarbonEmission)
                        .sum();

        double weeklyEmission =
                activities.stream()
                        .filter(a ->
                                !a.getActivityDate()
                                        .isBefore(today.minusDays(6)))
                        .mapToDouble(Activity::getCarbonEmission)
                        .sum();

        double monthlyEmission =
                activities.stream()
                        .filter(a ->
                                a.getActivityDate().getMonth() == today.getMonth()
                                        &&
                                        a.getActivityDate().getYear() == today.getYear())
                        .mapToDouble(Activity::getCarbonEmission)
                        .sum();

        int badgeCount =
                badgeRepository.findByUser(user).size();

        Goal goal =
                goalRepository.findByUser(user).orElse(null);

        double progress = 0;

        String goalCategory = "No Active Goal";

        if (goal != null) {

            goalCategory = goal.getCategory().getName();

            if (goal.getTargetEmission() > 0) {

                progress =
                        (goal.getCurrentEmission()
                                / goal.getTargetEmission()) * 100;

                progress = Math.min(progress, 100);

            }
        }

        int completedDaily =
                (int) dailyMissionRepository
                        .findByUserAndMissionDate(user, today)
                        .stream()
                        .filter(m ->
                                m.getStatus() == MissionStatus.COMPLETED)
                        .count();

        LocalDate weekStart =
                today.with(DayOfWeek.MONDAY);

        int completedWeekly =
                (int) weeklyMissionRepository
                        .findByUserAndWeekStart(user, weekStart)
                        .stream()
                        .filter(m ->
                                m.getStatus() == MissionStatus.COMPLETED)
                        .count();

        return DashboardResponse.builder()

                .totalActivities(totalActivities)

                .totalCarbonEmission(
                        Math.round(totalCarbonEmission * 100.0) / 100.0
                )

                .averageCarbonEmission(
                        Math.round(averageCarbonEmission * 100.0) / 100.0
                )

                .todayEmission(
                        Math.round(todayEmission * 100.0) / 100.0
                )

                .weeklyEmission(
                        Math.round(weeklyEmission * 100.0) / 100.0
                )

                .monthlyEmission(
                        Math.round(monthlyEmission * 100.0) / 100.0
                )

                .xp(user.getXp())

                .currentStreak(user.getCurrentStreak())

                .longestStreak(user.getLongestStreak())

                .badgeCount(badgeCount)

                .activeGoalCategory(goalCategory)

                .goalProgress(
                        Math.round(progress * 100.0) / 100.0
                )

                .completedDailyMissions(completedDaily)

                .completedWeeklyMissions(completedWeekly)

                .build();
    }

    @Override
    public AdminDashboardResponse getAdminDashboard() {

        Long totalUsers = userRepository.count();

        Long totalActivities = activityRepository.count();

        Double totalCarbon = activityRepository.getTotalCarbonEmission();

        Double averageCarbonPerUser =
                totalUsers == 0
                        ? 0.0
                        : totalCarbon / totalUsers;

        return AdminDashboardResponse.builder()
                .totalUsers(totalUsers)
                .totalActivities(totalActivities)
                .totalCarbon(totalCarbon)
                .averageCarbonPerUser(averageCarbonPerUser)
                .build();
    }
}