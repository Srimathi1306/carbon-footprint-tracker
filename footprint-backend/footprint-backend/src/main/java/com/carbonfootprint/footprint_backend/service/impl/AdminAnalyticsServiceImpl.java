package com.carbonfootprint.footprint_backend.service.impl;


import com.carbonfootprint.footprint_backend.dto.AdminCategoryAnalyticsResponse;
import com.carbonfootprint.footprint_backend.dto.AdminDashboardResponse;

import com.carbonfootprint.footprint_backend.dto.CategoryResponse;
import com.carbonfootprint.footprint_backend.dto.TrendResponse;
import com.carbonfootprint.footprint_backend.entity.Activity;
import com.carbonfootprint.footprint_backend.repository.ActivityRepository;
import com.carbonfootprint.footprint_backend.repository.UserRepository;
import com.carbonfootprint.footprint_backend.service.AdminAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AdminAnalyticsServiceImpl implements AdminAnalyticsService {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;

    @Override
    public AdminDashboardResponse getDashboardStats() {

        long totalUsers = userRepository.count();

        long totalActivities = activityRepository.count();

        Double totalCarbon = activityRepository.getTotalCarbonEmission();

        Double averageCarbonPerUser =
                totalUsers == 0 ? 0 : totalCarbon / totalUsers;

        return AdminDashboardResponse.builder()
                .totalUsers(totalUsers)
                .totalActivities(totalActivities)
                .totalCarbon(totalCarbon)
                .averageCarbonPerUser(averageCarbonPerUser)
                .build();
    }

    @Override
    public List<TrendResponse> getCarbonTrend(String filter) {

        List<Activity> activities = activityRepository.findAllWithCategory();

        Map<String, Double> map = new TreeMap<>();

        for (Activity activity : activities) {

            LocalDate date = activity.getActivityDate();

            String key;

            switch (filter) {

                case "Daily":
                    key = date.toString();
                    break;

                case "Weekly":
                    WeekFields weekFields = WeekFields.ISO;
                    key = date.getYear() + "-W" +
                            date.get(weekFields.weekOfWeekBasedYear());
                    break;

                case "Yearly":
                    key = String.valueOf(date.getYear());
                    break;

                default:
                    key = date.getYear() + "-" +
                            String.format("%02d", date.getMonthValue());
            }

            map.put(
                    key,
                    map.getOrDefault(key, 0.0)
                            + activity.getCarbonEmission()
            );
        }

        List<TrendResponse> response = new ArrayList<>();

        map.forEach((k, v) ->
                response.add(new TrendResponse(k, v)));

        return response;
    }

    @Override
    public List<AdminCategoryAnalyticsResponse> getCategoryBreakdown() {

        List<Activity> activities = activityRepository.findAllWithCategory();

        Map<String, Double> categoryTotals = new HashMap<>();

        for (Activity activity : activities) {

            String category = activity.getEmissionFactor()
                    .getCategory()
                    .getName();

            categoryTotals.put(
                    category,
                    categoryTotals.getOrDefault(category, 0.0)
                            + activity.getCarbonEmission()
            );
        }

        List<AdminCategoryAnalyticsResponse> response = new ArrayList<>();

        categoryTotals.forEach((k, v) ->
                response.add(new AdminCategoryAnalyticsResponse(k, v))
        );

        return response;
    }

}