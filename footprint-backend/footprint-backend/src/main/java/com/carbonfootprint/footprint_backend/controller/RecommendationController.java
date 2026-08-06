package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.RecommendationResponse;
import com.carbonfootprint.footprint_backend.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping
    public ResponseEntity<List<RecommendationResponse>> getRecommendations(
            Authentication authentication) {

        return ResponseEntity.ok(
                recommendationService.getRecommendations(authentication.getName())
        );
    }
}
