package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.LeaderboardResponse;
import com.carbonfootprint.footprint_backend.service.LeaderboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @GetMapping
    public ResponseEntity<List<LeaderboardResponse>> getLeaderboard() {

        return ResponseEntity.ok(
                leaderboardService.getLeaderboard()
        );

    }

}
