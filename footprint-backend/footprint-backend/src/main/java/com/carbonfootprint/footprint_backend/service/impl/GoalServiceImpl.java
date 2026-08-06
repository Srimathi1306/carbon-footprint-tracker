package com.carbonfootprint.footprint_backend.service.impl;


import com.carbonfootprint.footprint_backend.dto.AlertResponse;
import com.carbonfootprint.footprint_backend.dto.GoalRequest;
import com.carbonfootprint.footprint_backend.dto.GoalResponse;
import com.carbonfootprint.footprint_backend.entity.*;
import com.carbonfootprint.footprint_backend.repository.*;
import com.carbonfootprint.footprint_backend.service.GoalService;
import com.carbonfootprint.footprint_backend.service.NotificationService;
import com.carbonfootprint.footprint_backend.service.XpService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ActivityRepository activityRepository;
    private final NotificationService notificationService;
    private final XpService xpService;


    @Override
    public GoalResponse createGoal(GoalRequest request, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        LocalDate startDate = LocalDate.now();

        LocalDate endDate = startDate.plusDays(request.getDurationDays() - 1);

        LocalDate previousStart = startDate.minusDays(request.getDurationDays());

        LocalDate previousEnd = startDate.minusDays(1);

        Double baselineEmission =
                activityRepository.getTotalEmissionForCategoryBetweenDates(
                        user.getId(),
                        category.getId(),
                        previousStart,
                        previousEnd
                );

        if (baselineEmission == null) {
            baselineEmission = 0.0;
        }

        Double targetEmission =
                Math.round(
                        baselineEmission *
                                (1 - request.getReductionPercentage() / 100.0)
                                * 100.0
                ) / 100.0;

        Goal existingGoal = goalRepository.findByUser(user).orElse(null);

        if (existingGoal != null &&
                existingGoal.getStatus() == GoalStatus.ACTIVE) {

            throw new RuntimeException(
                    "You already have an active goal. Update or cancel it first."
            );
        }

        Goal goal = existingGoal != null ? existingGoal : new Goal();

        goal.setUser(user);
        goal.setCategory(category);
        goal.setBaselineEmission(baselineEmission);
        goal.setTargetEmission(targetEmission);
        goal.setCurrentEmission(0.00);
        goal.setReductionPercentage(request.getReductionPercentage());
        goal.setDurationDays(request.getDurationDays());
        goal.setStartDate(startDate);
        goal.setEndDate(endDate);
        goal.setStatus(GoalStatus.ACTIVE);

        goalRepository.save(goal);

        notificationService.createNotification(
                user,
                NotificationType.GOAL,
                "Goal Created",
                "Your carbon reduction goal has been created successfully.",
                "/goals"
        );

        return GoalResponse.builder()
                .goalId(goal.getId())
                .category(category.getName())
                .baselineEmission(goal.getBaselineEmission())
                .targetEmission(goal.getTargetEmission())
                .currentEmission(goal.getCurrentEmission())
                .remainingEmission(goal.getTargetEmission())
                .progressPercentage(0.0)
                .reductionPercentage(goal.getReductionPercentage())
                .durationDays(goal.getDurationDays())
                .daysLeft(
                        java.time.temporal.ChronoUnit.DAYS.between(
                                LocalDate.now(),
                                goal.getEndDate()
                        ) + 1
                )
                .status(goal.getStatus().name())
                .startDate(goal.getStartDate())
                .endDate(goal.getEndDate())
                .build();
    }

    @Override
    public GoalResponse updateGoal(Long goalId,
                                   GoalRequest request,
                                   String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        LocalDate startDate = LocalDate.now();

        LocalDate endDate = startDate.plusDays(request.getDurationDays());

        LocalDate previousStart = startDate.minusDays(request.getDurationDays());

        LocalDate previousEnd = startDate.minusDays(1);

        Double baselineEmission =
                activityRepository.getTotalEmissionForCategoryBetweenDates(
                        user.getId(),
                        category.getId(),
                        previousStart,
                        previousEnd
                );

        if (baselineEmission == null)
            baselineEmission = 0.0;

        Double targetEmission =
                baselineEmission *
                        (1 - request.getReductionPercentage() / 100);

        goal.setCategory(category);
        goal.setBaselineEmission(baselineEmission);
        goal.setTargetEmission(targetEmission);
        goal.setReductionPercentage(request.getReductionPercentage());
        goal.setDurationDays(request.getDurationDays());
        goal.setCurrentEmission(0.0);
        goal.setStatus(GoalStatus.ACTIVE);
        goal.setStartDate(startDate);
        goal.setEndDate(endDate);

        goalRepository.save(goal);

        notificationService.createNotification(
                user,
                NotificationType.GOAL,
                "Goal Updated",
                "Your goal has been updated successfully.",
                "/goals"
        );

        return mapToGoalResponse(goal);
    }

    @Override
    public void cancelGoal(Long goalId,
                           String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        goalRepository.delete(goal);

        notificationService.createNotification(
                user,
                NotificationType.GOAL,
                "Goal Cancelled",
                "Your goal has been cancelled.",
                "/goals"
        );
    }

    @Override
    public void evaluateGoal(User user) {

        Goal goal = goalRepository.findByUser(user).orElse(null);

        if (goal == null) {
            return;
        }

        if (goal.getStatus() == GoalStatus.CANCELLED ||
                goal.getStatus() == GoalStatus.COMPLETED ||
                goal.getStatus() == GoalStatus.FAILED) {
            return;
        }

        Double currentEmission =
                activityRepository.getTotalEmissionForCategoryBetweenDates(
                        user.getId(),
                        goal.getCategory().getId(),
                        goal.getStartDate(),
                        goal.getEndDate()
                );

        if (currentEmission == null) {
            currentEmission = 0.0;
        }

        goal.setCurrentEmission(currentEmission);

        LocalDate today = LocalDate.now();

        if (today.isAfter(goal.getEndDate())) {

            if (currentEmission <= goal.getTargetEmission()) {

                goal.setStatus(GoalStatus.COMPLETED);

                user.setXp(user.getXp() + 100);

                userRepository.save(user);

                notificationService.createNotification(
                        user,
                        NotificationType.GOAL,
                        "Goal Completed 🎉",
                        "Congratulations! You completed your carbon reduction goal and earned +100 XP.",
                        "/goals"
                );

            } else {

                goal.setStatus(GoalStatus.FAILED);

                notificationService.createNotification(
                        user,
                        NotificationType.GOAL,
                        "Goal Failed",
                        "Your carbon reduction goal has ended without meeting the target.",
                        "/goals"
                );

            }

        } else {

            goal.setStatus(GoalStatus.ACTIVE);

        }

        goalRepository.save(goal);

    }

    @Override
    public GoalResponse getMyGoal(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Goal goal = goalRepository.findByUser(user).orElse(null);

        if (goal == null) {
            return null;
        }

        Double currentEmission =
                activityRepository.getTotalEmissionForCategoryBetweenDates(
                        user.getId(),
                        goal.getCategory().getId(),
                        goal.getStartDate(),
                        goal.getEndDate()
                );

        if (currentEmission == null) {
            currentEmission = 0.0;
        }

        goal.setCurrentEmission(currentEmission);

        goalRepository.save(goal);

        return mapToGoalResponse(goal);

    }

    private GoalResponse mapToGoalResponse(Goal goal) {

        double remaining =
                Math.max(goal.getTargetEmission() - goal.getCurrentEmission(), 0);

        double progress =
                goal.getTargetEmission() == 0
                        ? 0
                        : (goal.getCurrentEmission() / goal.getTargetEmission()) * 100;

        progress = Math.min(progress, 100);

        long daysLeft =
                ChronoUnit.DAYS.between(LocalDate.now(), goal.getEndDate());

        if (daysLeft < 0)
            daysLeft = 0;

        return GoalResponse.builder()
                .goalId(goal.getId())
                .category(goal.getCategory().getName())
                .baselineEmission(goal.getBaselineEmission())
                .targetEmission(goal.getTargetEmission())
                .currentEmission(goal.getCurrentEmission())
                .remainingEmission(Math.round(remaining * 100.0) / 100.0)
                .progressPercentage(Math.round(progress * 100.0) / 100.0)
                .reductionPercentage(goal.getReductionPercentage())
                .durationDays(goal.getDurationDays())
                .daysLeft(daysLeft)
                .status(goal.getStatus().name())
                .startDate(goal.getStartDate())
                .endDate(goal.getEndDate())
                .build();

    }

}