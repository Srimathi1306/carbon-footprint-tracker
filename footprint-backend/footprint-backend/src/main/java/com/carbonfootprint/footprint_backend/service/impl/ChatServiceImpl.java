package com.carbonfootprint.footprint_backend.service.impl;
import com.carbonfootprint.footprint_backend.chat.ChatIntent;
import com.carbonfootprint.footprint_backend.chat.ChatIntentDetector;
import com.carbonfootprint.footprint_backend.dto.AdminDashboardResponse;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.repository.ActivityRepository;
import com.carbonfootprint.footprint_backend.repository.GoalRepository;
import com.carbonfootprint.footprint_backend.repository.UserRepository;
import com.carbonfootprint.footprint_backend.service.ChatService;
import com.carbonfootprint.footprint_backend.service.DashboardService;
import com.carbonfootprint.footprint_backend.service.ai.GroqService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatIntentDetector detector;

    private final DashboardService dashboardService;

    private final GoalRepository goalRepository;

    private final ActivityRepository activityRepository;

    private final UserRepository userRepository;

    private final GroqService groqService;

    @Override
    public String askQuestion(String email, String message) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long userId = user.getId();

        ChatIntent intent = detector.detect(message);

        switch (intent) {

            case YESTERDAY:
                return yesterday(userId, message);

            case TODAY:
                return today(userId, message);

            case WEEK:
                return week(userId, message);

            case MONTH:
                return month(userId, message);

            case GOAL:
                return goal(userId, message);

            case XP:
                return xp(userId, message);

            case BADGE:
                return badge(userId, message);

            case STREAK:
                return streak(userId, message);

            case ACTIVITY:
                return activity(userId, message);

            case ADMIN_USERS:
                return adminUsers(message);

            case ADMIN_ACTIVITY:
                return adminActivity(message);

            default:
                return general(message);
        }
    }

    private String yesterday(Long userId, String message) {

        LocalDate yesterday = LocalDate.now().minusDays(1);

        Double emission =
                activityRepository.getEmissionByDate(userId, yesterday);

        Long count =
                activityRepository.countActivitiesByDate(userId, yesterday);

        String prompt = """
User Dashboard

Yesterday emission : %.2f kg CO₂

Yesterday activity count : %d

Question:

%s

Answer naturally in less than 70 words.
"""
                .formatted(emission, count, message);

        return groqService.askChatbot(prompt);

    }

    private String today(Long userId, String message) {

        LocalDate today = LocalDate.now();

        Double emission =
                activityRepository.getEmissionByDate(userId, today);

        Long count =
                activityRepository.countActivitiesByDate(userId, today);

        String prompt = """
Today's Dashboard

Emission : %.2f kg CO₂

Activities : %d

Question:

%s
"""
                .formatted(emission, count, message);

        return groqService.askChatbot(prompt);

    }

    private String week(Long userId, String message) {

        LocalDate end = LocalDate.now();

        LocalDate start = end.minusDays(6);

        Double emission =
                activityRepository.getTotalCarbonEmissionByUserAndDateRange(
                        userId,
                        start,
                        end
                );

        String prompt = """
Current Week Dashboard

Weekly emission : %.2f kg CO₂

Question:

%s
"""
                .formatted(emission, message);

        return groqService.askChatbot(prompt);

    }

    private String month(Long userId, String message) {

        LocalDate today = LocalDate.now();

        LocalDate start =
                today.withDayOfMonth(1);

        Double emission =
                activityRepository.getTotalCarbonEmissionByUserAndDateRange(
                        userId,
                        start,
                        today
                );

        String prompt = """
Current Month Dashboard

Monthly emission : %.2f kg CO₂

Question:

%s
"""
                .formatted(emission, message);

        return groqService.askChatbot(prompt);

    }

    private String goal(Long userId, String message) {

        User user = userRepository.findById(userId)
                .orElseThrow();

        var goal = goalRepository.findByUser(user);

        if (goal.isEmpty()) {
            return "You don't have an active goal.";
        }

        var g = goal.get();

        String prompt = """
User Goal

Category : %s

Target : %.2f kg

Current : %.2f kg

Question:

%s

Answer naturally.
"""
                .formatted(
                        g.getCategory().getName(),
                        g.getTargetEmission(),
                        g.getCurrentEmission(),
                        message
                );

        return groqService.askChatbot(prompt);
    }

    private String xp(Long userId, String message) {

        User user = userRepository.findById(userId)
                .orElseThrow();

        return groqService.askChatbot("""
User XP

XP : %d

Question:

%s

Answer naturally.
"""
                .formatted(
                        user.getXp(),
                        message
                ));
    }

    private String badge(Long userId, String message) {

        User user = userRepository.findById(userId)
                .orElseThrow();

        int badges = user.getBadges().size();

        return groqService.askChatbot("""
User Dashboard

Badges : %d

Question:

%s

Answer naturally.
"""
                .formatted(
                        badges,
                        message
                ));
    }

    private String streak(Long userId, String message) {

        User user = userRepository.findById(userId)
                .orElseThrow();

        return groqService.askChatbot("""
User Dashboard

Current streak : %d

Longest streak : %d

Question:

%s

Answer naturally.
"""
                .formatted(
                        user.getCurrentStreak(),
                        user.getLongestStreak(),
                        message
                ));
    }

    private String activity(Long userId, String message) {

        Long count =
                activityRepository.countByUserId(userId);

        return "You have logged " + count + " activities.";
    }

    private String adminUsers(String message) {

        AdminDashboardResponse admin =
                dashboardService.getAdminDashboard();

        String prompt = """
Admin Dashboard

Total Users : %d

Question:

%s

Answer naturally in less than 70 words.
"""
                .formatted(
                        admin.getTotalUsers(),
                        message
                );

        return groqService.askChatbot(prompt);
    }

    private String adminActivity(String message) {

        AdminDashboardResponse admin =
                dashboardService.getAdminDashboard();

        String prompt = """
Admin Dashboard

Total Activities : %d

Total Carbon Emission : %.2f kg CO₂

Average Carbon Per User : %.2f kg CO₂

Question:

%s

Answer naturally in less than 70 words.
"""
                .formatted(
                        admin.getTotalActivities(),
                        admin.getTotalCarbon(),
                        admin.getAverageCarbonPerUser(),
                        message
                );

        return groqService.askChatbot(prompt);
    }

    private String general(String message) {

        return groqService.askChatbot("""
The user asked:

%s

If the question is related to sustainability or carbon footprint, answer it.

If it is unrelated, politely answer it.

Keep the response under 100 words.
""".formatted(message));

    }
}