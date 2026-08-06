package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.ActivityResponse;
import com.carbonfootprint.footprint_backend.dto.AdminCategoryAnalyticsResponse;
import com.carbonfootprint.footprint_backend.dto.CategoryResponse;
import com.carbonfootprint.footprint_backend.service.ActivityService;
import com.carbonfootprint.footprint_backend.service.AdminAnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/activities")
public class AdminActivityController {

    private final ActivityService activityService;
    private final AdminAnalyticsService adminAnalyticsService;

    public AdminActivityController(ActivityService activityService, AdminAnalyticsService adminAnalyticsService) {
        this.activityService = activityService;
        this.adminAnalyticsService=adminAnalyticsService;
    }

    @GetMapping
    public ResponseEntity<List<ActivityResponse>> getAllActivities() {

        return ResponseEntity.ok(
                activityService.getAllActivities()
        );
    }
    @GetMapping("/categories")
    public ResponseEntity<List<AdminCategoryAnalyticsResponse>> getCategoryBreakdown() {

        return ResponseEntity.ok(
                adminAnalyticsService.getCategoryBreakdown()
        );
    }
}