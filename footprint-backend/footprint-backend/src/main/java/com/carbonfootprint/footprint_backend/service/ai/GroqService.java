package com.carbonfootprint.footprint_backend.service.ai;

import com.carbonfootprint.footprint_backend.dto.RecommendationResponse;

import java.util.List;
import java.util.Map;

public interface GroqService {

    List<RecommendationResponse> generateRecommendations(
            List<Map.Entry<String, Double>> topActivities
    );

    String askChatbot(String prompt);

}