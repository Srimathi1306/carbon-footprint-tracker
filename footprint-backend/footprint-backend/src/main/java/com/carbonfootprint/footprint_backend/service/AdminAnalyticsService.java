package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.AdminCategoryAnalyticsResponse;
import com.carbonfootprint.footprint_backend.dto.AdminDashboardResponse;
import com.carbonfootprint.footprint_backend.dto.CategoryResponse;
import com.carbonfootprint.footprint_backend.dto.TrendResponse;

import java.util.List;

public interface AdminAnalyticsService {

    AdminDashboardResponse getDashboardStats();

    List<TrendResponse> getCarbonTrend(String filter);

    List<AdminCategoryAnalyticsResponse> getCategoryBreakdown();


}