package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.dto.RecommendationResponse;
import com.carbonfootprint.footprint_backend.entity.Activity;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.repository.ActivityRepository;
import com.carbonfootprint.footprint_backend.repository.UserRepository;
import com.carbonfootprint.footprint_backend.service.RecommendationService;
import com.carbonfootprint.footprint_backend.service.ai.GroqService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RecommendationServiceImpl implements RecommendationService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    private final GroqService groqService;

    @Override
    public List<RecommendationResponse> getRecommendations(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);

        List<Activity> activities = activityRepository
                .findAllWithCategoryByUserId(user.getId())
                .stream()
                .filter(a -> !a.getActivityDate().isBefore(thirtyDaysAgo))
                .toList();

        Map<String, Double> totals = new HashMap<>();

        for (Activity activity : activities) {

            String activityType = activity.getEmissionFactor().getActivityType();

            totals.put(
                    activityType,
                    totals.getOrDefault(activityType, 0.0)
                            + activity.getCarbonEmission()
            );
        }

        List<Map.Entry<String, Double>> topActivities = totals.entrySet()
                .stream()
                .sorted((a, b) -> Double.compare(b.getValue(), a.getValue()))
                .limit(3)
                .toList();

        // ---------- AI Recommendation ----------
        List<RecommendationResponse> aiRecommendations =
                groqService.generateRecommendations(topActivities);

        if (!aiRecommendations.isEmpty()) {

            for (RecommendationResponse recommendation : aiRecommendations) {

                recommendation.setEmission(
                        totals.getOrDefault(
                                recommendation.getActivity(),
                                0.0
                        )
                );
            }

            return aiRecommendations;
        }

        // ---------- Hardcoded Fallback ----------
        List<RecommendationResponse> response = new ArrayList<>();

        for (Map.Entry<String, Double> entry : topActivities) {

            response.add(
                    RecommendationResponse.builder()
                            .activity(entry.getKey())
                            .emission(entry.getValue())
                            .recommendation(
                                    getHardcodedRecommendation(entry.getKey())
                            )
                            .build()
            );
        }

        return response;
    }

    private String getHardcodedRecommendation(String activity) {


        switch (activity.toLowerCase()) {

            // ---------- Transport ----------
            case "petrol":
                return "Reduce petrol vehicle usage by carpooling, public transport, or walking whenever possible.";

            case "diesel":
                return "Limit diesel vehicle trips and maintain your vehicle regularly for better fuel efficiency.";

            case "electric vehicle":
                return "Charge during off-peak hours and use renewable electricity whenever possible.";

            case "bus":
                return "Public transport already has lower emissions. Continue using buses whenever practical.";

            case "train":
                return "Train travel is one of the most sustainable transport options. Prefer it over flights.";

            case "flight":
                return "Reduce short-distance flights and choose trains when feasible.";

            // ---------- Electricity ----------
            case "grid electricity":
                return "Reduce electricity usage by switching off unused appliances and using LED lighting.";

            case "solar electricity":
                return "Excellent choice. Maximize solar usage and reduce dependence on grid electricity.";

            // ---------- Food ----------
            case "beef":
                return "Reducing beef consumption even once a week can significantly lower your carbon footprint.";

            case "chicken":
                return "Choose plant-based meals occasionally to reduce food-related emissions.";

            case "vegetarian":
                return "Great! Continue choosing low-carbon food options.";

            // ---------- Shopping ----------
            case "clothing":
                return "Buy durable clothing, repair garments when possible, and avoid fast fashion purchases.";

            case "electronics":
                return "Extend the life of electronics through repairs and recycling instead of frequent replacement.";

            case "plastic":
                return "Reduce single-use plastics and choose reusable alternatives.";

            // ---------- Waste ----------
            case "food waste":
                return "Plan meals carefully and compost organic waste to reduce emissions.";

            case "recycling":
                return "Continue recycling consistently and separate waste correctly.";

            default:
                return "Reduce usage where possible and choose sustainable alternatives.";
        }
    }
}