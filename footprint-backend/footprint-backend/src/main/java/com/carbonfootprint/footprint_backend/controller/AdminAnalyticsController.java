package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.AdminCategoryAnalyticsResponse;
import com.carbonfootprint.footprint_backend.dto.TrendResponse;
import com.carbonfootprint.footprint_backend.service.AdminAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/analytics")
@RequiredArgsConstructor
public class AdminAnalyticsController {

    private final AdminAnalyticsService adminAnalyticsService;

//    @GetMapping("/dashboard")
//    public AdminDashboardResponse dashboard() {
//
//        return adminAnalyticsService.getDashboardStats();
//
//    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard() {
        try {
            return ResponseEntity.ok(adminAnalyticsService.getDashboardStats());
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/trend")
    public ResponseEntity<List<TrendResponse>> getTrend(
            @RequestParam(defaultValue = "Monthly") String filter) {

        return ResponseEntity.ok(
                adminAnalyticsService.getCarbonTrend(filter)
        );
    }

    @GetMapping("/categories")
    public ResponseEntity<List<AdminCategoryAnalyticsResponse>> getCategories() {

        return ResponseEntity.ok(
                adminAnalyticsService.getCategoryBreakdown()
        );
    }
}