package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.RecommendationResponse;

import java.util.List;

public interface RecommendationService {

    List<RecommendationResponse> getRecommendations(String email);

}