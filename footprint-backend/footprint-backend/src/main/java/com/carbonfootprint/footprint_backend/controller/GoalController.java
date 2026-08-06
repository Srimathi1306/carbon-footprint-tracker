package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.GoalRequest;
import com.carbonfootprint.footprint_backend.dto.GoalResponse;
import com.carbonfootprint.footprint_backend.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @PostMapping("/create")
    public ResponseEntity<GoalResponse> createGoal(
            @RequestBody GoalRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                goalService.createGoal(
                        request,
                        authentication.getName()
                )
        );
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<String> cancelGoal(
            @PathVariable Long goalId,
            Authentication authentication) {

        goalService.cancelGoal(goalId, authentication.getName());

        return ResponseEntity.ok("Goal cancelled successfully");
    }

    @PutMapping("/{goalId}")
    public ResponseEntity<GoalResponse> updateGoal(
            @PathVariable Long goalId,
            @RequestBody GoalRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                goalService.updateGoal(
                        goalId,
                        request,
                        authentication.getName()
                )
        );
    }

    @GetMapping
    public ResponseEntity<?> getGoal(Authentication authentication) {

        GoalResponse response =
                goalService.getMyGoal(authentication.getName());

        if (response == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(response);
    }
}
