package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.ActivityResponse;
import com.carbonfootprint.footprint_backend.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/organization/activities")
@RequiredArgsConstructor
public class OrganizationActivityController {

    private final ActivityService activityService;

    @GetMapping
    public ResponseEntity<List<ActivityResponse>> getOrganizationActivities(
            Authentication authentication) {

        return ResponseEntity.ok(
                activityService.getOrganizationActivities(
                        authentication.getName()
                )
        );
    }
}
