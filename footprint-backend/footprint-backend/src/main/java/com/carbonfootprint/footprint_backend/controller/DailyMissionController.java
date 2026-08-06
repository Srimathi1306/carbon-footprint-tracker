package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.DailyMissionResponse;
import com.carbonfootprint.footprint_backend.service.DailyMissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/daily-missions")
@RequiredArgsConstructor
public class DailyMissionController {

    private final DailyMissionService dailyMissionService;

    @GetMapping
    public ResponseEntity<List<DailyMissionResponse>> getTodayMissions(
            Authentication authentication) {

        return ResponseEntity.ok(
                dailyMissionService.getTodayMissions(
                        authentication.getName()
                )
        );
    }
}