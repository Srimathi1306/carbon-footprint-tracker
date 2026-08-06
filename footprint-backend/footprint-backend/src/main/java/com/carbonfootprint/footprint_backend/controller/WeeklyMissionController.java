package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.WeeklyMissionResponse;
import com.carbonfootprint.footprint_backend.service.WeeklyMissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/weekly-missions")
@RequiredArgsConstructor
public class WeeklyMissionController {

    private final WeeklyMissionService weeklyMissionService;

    @GetMapping
    public ResponseEntity<List<WeeklyMissionResponse>> getWeeklyMissions(
            Authentication authentication) {

        return ResponseEntity.ok(
                weeklyMissionService.getCurrentWeekMissions(
                        authentication.getName()
                )
        );
    }
}