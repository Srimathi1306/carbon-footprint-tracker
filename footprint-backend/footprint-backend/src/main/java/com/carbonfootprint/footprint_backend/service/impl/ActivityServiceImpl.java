package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.dto.ActivityRequest;
import com.carbonfootprint.footprint_backend.dto.ActivityResponse;
import com.carbonfootprint.footprint_backend.entity.Activity;
import com.carbonfootprint.footprint_backend.entity.NotificationType;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.entity.EmissionFactor;
import com.carbonfootprint.footprint_backend.event.BadgeEvent;
import com.carbonfootprint.footprint_backend.repository.ActivityRepository;
import com.carbonfootprint.footprint_backend.repository.UserRepository;
import com.carbonfootprint.footprint_backend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    private final EmissionFactorService emissionFactorService;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final XpService xpService;
    private final NotificationService notificationService;
    private final GoalService goalService;
    private final DailyMissionService dailyMissionService;
    private final WeeklyMissionService weeklyMissionService;

    @Override
    public ActivityResponse addActivity(ActivityRequest request,
                                        String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        EmissionFactor emissionFactor =
                emissionFactorService.getEmissionFactorById(
                        request.getEmissionFactorId()
                );

        Activity activity = new Activity();

        LocalDateTime now = LocalDateTime.now();

        activity.setUser(user);
        activity.setEmissionFactor(emissionFactor);
        activity.setQuantity(request.getQuantity());
        activity.setActivityDate(request.getActivityDate());

        activity.setCarbonEmission(
                request.getQuantity() *
                        emissionFactor.getEmissionFactor()
        );

        activity.setCreatedAt(now);
        activity.setUpdatedAt(now);

        Activity savedActivity =
                activityRepository.save(activity);

        xpService.addXp(
                user,
                5,
                "Activity Logged"
        );

        goalService.evaluateGoal(user);

        dailyMissionService.updateMissionProgress(user);

        weeklyMissionService.updateWeeklyMissionProgress(user);

        notificationService.createNotification(
                user,
                NotificationType.ACTIVITY,
                "Activity Logged",
                "You earned +5 XP for logging a new activity.",
                "/activities"
        );

        LocalDate today = LocalDate.now();

        if (user.getLastActivityDate() == null) {

            user.setCurrentStreak(1);

        }
        else if (user.getLastActivityDate().plusDays(1).equals(today)) {

            user.setCurrentStreak(user.getCurrentStreak() + 1);

        }
        else if (!user.getLastActivityDate().equals(today)) {

            user.setCurrentStreak(1);

        }

        if (user.getCurrentStreak() > user.getLongestStreak()) {

            user.setLongestStreak(user.getCurrentStreak());

        }

        user.setLastActivityDate(today);

        userRepository.save(user);

        System.out.println("Publishing Badge Event for user: " + user.getId());

        applicationEventPublisher.publishEvent(
                new BadgeEvent(user.getId())
        );

        return mapToResponse(savedActivity);
    }

    @Override
    public List<ActivityResponse> getMyActivities(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return activityRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ActivityResponse> getAllActivities() {

        return activityRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ActivityResponse getActivityById(Long id,
                                            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Activity activity = activityRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Activity not found"));

        if (!activity.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized Access");
        }

        return mapToResponse(activity);
    }

    @Override
    public ActivityResponse updateActivity(Long id,
                                           ActivityRequest request,
                                           String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Activity activity = activityRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Activity not found"));

        if (!activity.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized Access");
        }

        EmissionFactor emissionFactor =
                emissionFactorService.getEmissionFactorById(
                        request.getEmissionFactorId()
                );

        activity.setEmissionFactor(emissionFactor);
        activity.setQuantity(request.getQuantity());
        activity.setActivityDate(request.getActivityDate());
        activity.setUpdatedAt(LocalDateTime.now());
        activity.setCarbonEmission(
                request.getQuantity() *
                        emissionFactor.getEmissionFactor()
        );

        Activity updatedActivity = activityRepository.save(activity);

        goalService.evaluateGoal(user);

        dailyMissionService.updateMissionProgress(user);

        weeklyMissionService.updateWeeklyMissionProgress(user);

        return mapToResponse(updatedActivity);
    }

    @Override
    public void deleteActivity(Long id,
                               String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Activity activity = activityRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Activity not found"));

        if (!activity.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized Access");
        }

        activityRepository.delete(activity);

        goalService.evaluateGoal(user);
    }

    private ActivityResponse mapToResponse(Activity activity) {

        EmissionFactor factor = activity.getEmissionFactor();

        return ActivityResponse.builder()
                .id(activity.getId())
                .emissionFactorId(factor.getId())
                .userName(activity.getUser().getName())
                .category(factor.getCategory().getName())
                .activityType(factor.getActivityType())
                .unit(factor.getUnit())
                .quantity(activity.getQuantity())
                .carbonEmission(activity.getCarbonEmission())
                .activityDate(activity.getActivityDate())
                .build();
    }
}