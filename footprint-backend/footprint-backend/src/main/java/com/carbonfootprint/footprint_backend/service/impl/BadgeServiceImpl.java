package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.entity.Badge;
import com.carbonfootprint.footprint_backend.entity.GoalStatus;
import com.carbonfootprint.footprint_backend.entity.NotificationType;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.repository.ActivityRepository;
import com.carbonfootprint.footprint_backend.repository.BadgeRepository;
import com.carbonfootprint.footprint_backend.repository.GoalRepository;
import com.carbonfootprint.footprint_backend.repository.UserRepository;
import com.carbonfootprint.footprint_backend.service.BadgeService;
import com.carbonfootprint.footprint_backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BadgeServiceImpl implements BadgeService {

    private final BadgeRepository badgeRepository;
    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final GoalRepository goalRepository;
    private final NotificationService notificationService;

    @Override
    public void checkBadges(Long userId) {

        System.out.println("Checking badges for user: " + userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        awardFirstActivityBadge(user);

        awardFirstActivityBadge(user);

        awardGoalBadge(user);

        awardXpBadge(user);

        awardStreakBadge(user);

        awardEcoWarriorBadge(user);
    }

    private void awardFirstActivityBadge(User user) {

        System.out.println("Checking First Activity Badge...");

        if (badgeRepository.findByUserAndBadgeName(user, "First Activity").isPresent()) {
            System.out.println("Badge already exists.");
            return;
        }

        if (!activityRepository.findByUser(user).isEmpty()) {

            System.out.println("Awarding First Activity Badge");

            Badge badge = Badge.builder()
                    .badgeName("First Activity")
                    .description("Logged your first carbon activity.")
                    .user(user)
                    .build();

            badgeRepository.save(badge);

            notificationService.createNotification(
                    user,
                    NotificationType.BADGE,
                    "New Badge Earned 🏅",
                    "Congratulations! You earned the 'First Activity' badge.",
                    "/badges"
            );

            System.out.println("Badge Saved");
        }
    }

    private void awardGoalBadge(User user) {

        if (badgeRepository.findByUserAndBadgeName(user,
                "Goal Achiever").isPresent())
            return;

        boolean completed =
                goalRepository.findAllByUser(user)
                        .stream()
                        .anyMatch(g ->
                                g.getStatus() == GoalStatus.COMPLETED);

        if (completed) {

            badgeRepository.save(
                    Badge.builder()
                            .badgeName("Goal Achiever")
                            .description("Completed your first goal.")
                            .user(user)
                            .build()
            );

            notificationService.createNotification(
                    user,
                    NotificationType.BADGE,
                    "New Badge Earned 🏅",
                    "Congratulations! You earned the 'Goal Achiever' badge.",
                    "/badges"
            );
        }
    }

    private void awardXpBadge(User user) {

        if (user.getXp() >= 100 &&
                badgeRepository.findByUserAndBadgeName(
                        user,
                        "100 XP").isEmpty()) {

            badgeRepository.save(
                    Badge.builder()
                            .badgeName("100 XP")
                            .description("Earned 100 XP.")
                            .user(user)
                            .build()
            );

            notificationService.createNotification(
                    user,
                    NotificationType.BADGE,
                    "New Badge Earned ⭐",
                    "Congratulations! You earned the '100 XP' badge.",
                    "/badges"
            );
        }

        if (user.getXp() >= 500 &&
                badgeRepository.findByUserAndBadgeName(
                        user,
                        "500 XP").isEmpty()) {

            badgeRepository.save(
                    Badge.builder()
                            .badgeName("500 XP")
                            .description("Earned 500 XP.")
                            .user(user)
                            .build()
            );

            notificationService.createNotification(
                    user,
                    NotificationType.BADGE,
                    "New Badge Earned 🌟",
                    "Congratulations! You earned the '500 XP' badge.",
                    "/badges"
            );
        }

        if (user.getXp() >= 1000 &&
                badgeRepository.findByUserAndBadgeName(
                        user,
                        "1000 XP").isEmpty()) {

            badgeRepository.save(
                    Badge.builder()
                            .badgeName("1000 XP")
                            .description("Earned 1000 XP.")
                            .user(user)
                            .build()
            );

            notificationService.createNotification(
                    user,
                    NotificationType.BADGE,
                    "Legend Badge 👑",
                    "Congratulations! You earned the '1000 XP' badge.",
                    "/badges"
            );
        }
    }

    private void awardStreakBadge(User user) {

        if (user.getCurrentStreak() >= 7 &&
                badgeRepository.findByUserAndBadgeName(
                        user,
                        "7 Day Streak").isEmpty()) {

            badgeRepository.save(
                    Badge.builder()
                            .badgeName("7 Day Streak")
                            .description("Maintained a 7 day streak.")
                            .user(user)
                            .build()
            );

            notificationService.createNotification(
                    user,
                    NotificationType.BADGE,
                    "Streak Badge 🔥",
                    "Congratulations! You earned the '7 Day Streak' badge.",
                    "/badges"
            );
        }

        if (user.getCurrentStreak() >= 30 &&
                badgeRepository.findByUserAndBadgeName(
                        user,
                        "30 Day Streak").isEmpty()) {

            badgeRepository.save(
                    Badge.builder()
                            .badgeName("30 Day Streak")
                            .description("Maintained a 30 day streak.")
                            .user(user)
                            .build()
            );

            notificationService.createNotification(
                    user,
                    NotificationType.BADGE,
                    "Streak Master 🚀",
                    "Congratulations! You earned the '30 Day Streak' badge.",
                    "/badges"
            );
        }
    }

    private void awardEcoWarriorBadge(User user) {

        if (badgeRepository.findByUserAndBadgeName(
                user,
                "Eco Warrior").isPresent())
            return;

        if (activityRepository.findByUser(user).size() >= 100) {

            badgeRepository.save(
                    Badge.builder()
                            .badgeName("Eco Warrior")
                            .description("Logged 100 activities.")
                            .user(user)
                            .build()
            );

            notificationService.createNotification(
                    user,
                    NotificationType.BADGE,
                    "Eco Warrior 🌍",
                    "Congratulations! You earned the 'Eco Warrior' badge.",
                    "/badges"
            );
        }
    }

    @Override
    public List<Badge> getUserBadges(String email){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return badgeRepository.findByUser(user);

    }
}