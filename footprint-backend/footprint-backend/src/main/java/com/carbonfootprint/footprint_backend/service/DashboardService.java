package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.AdminDashboardResponse;
import com.carbonfootprint.footprint_backend.dto.DashboardResponse;

public interface DashboardService {

    DashboardResponse getDashboard(String email);

    AdminDashboardResponse getAdminDashboard();
}
