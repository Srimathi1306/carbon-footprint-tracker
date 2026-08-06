package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.ActivityRequest;
import com.carbonfootprint.footprint_backend.dto.ActivityResponse;
import com.carbonfootprint.footprint_backend.service.ActivityService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/activities")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    // Add Activity
    @PostMapping
    public ResponseEntity<ActivityResponse> addActivity(
            @Valid @RequestBody ActivityRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        ActivityResponse response = activityService.addActivity(
                request,
                userDetails.getUsername()
        );

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get Logged-in User Activities
    @GetMapping
    public ResponseEntity<List<ActivityResponse>> getMyActivities(
            @AuthenticationPrincipal UserDetails userDetails) {

        List<ActivityResponse> response =
                activityService.getMyActivities(
                        userDetails.getUsername()
                );

        return ResponseEntity.ok(response);
    }

    // Get One Activity
    @GetMapping("/{id}")
    public ResponseEntity<ActivityResponse> getActivity(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {

        ActivityResponse response =
                activityService.getActivityById(
                        id,
                        userDetails.getUsername()
                );

        return ResponseEntity.ok(response);
    }

    // Update Activity
    @PutMapping("/{id}")
    public ResponseEntity<ActivityResponse> updateActivity(
            @PathVariable Long id,
            @Valid @RequestBody ActivityRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        ActivityResponse response =
                activityService.updateActivity(
                        id,
                        request,
                        userDetails.getUsername()
                );

        return ResponseEntity.ok(response);
    }

    // Delete Activity
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteActivity(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {

        activityService.deleteActivity(
                id,
                userDetails.getUsername()
        );

        return ResponseEntity.ok("Activity deleted successfully");
    }
}