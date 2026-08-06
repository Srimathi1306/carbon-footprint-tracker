package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.AdminDashboardDTO;
import com.carbonfootprint.footprint_backend.service.AdminDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/dashboard")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    public AdminDashboardController(AdminDashboardService adminDashboardService) {
        this.adminDashboardService = adminDashboardService;
    }

    @GetMapping
    public ResponseEntity<AdminDashboardDTO> getDashboard() {
        return ResponseEntity.ok(adminDashboardService.getDashboard());
    }
}
