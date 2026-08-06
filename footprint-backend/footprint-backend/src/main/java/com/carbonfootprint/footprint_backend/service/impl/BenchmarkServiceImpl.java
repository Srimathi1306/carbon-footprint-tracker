package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.dto.BenchmarkResponse;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.repository.ActivityRepository;
import com.carbonfootprint.footprint_backend.repository.UserRepository;
import com.carbonfootprint.footprint_backend.service.BenchmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BenchmarkServiceImpl implements BenchmarkService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;

    @Override
    public List<BenchmarkResponse> getBenchmark(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(30);

        List<Object[]> platform =
                activityRepository.getPlatformAverageByCategory(
                        startDate,
                        endDate
                );

        List<Object[]> userData =
                activityRepository.getUserEmissionByCategory(
                        user.getId(),
                        startDate,
                        endDate
                );

        List<Object[]> allUsers =
                activityRepository.getAllUsersCategoryEmission(
                        startDate,
                        endDate
                );
        Map<String, Double> userEmission = new HashMap<>();

        for (Object[] row : userData) {

            userEmission.put(
                    (String) row[0],
                    ((Number) row[1]).doubleValue()
            );
        }

        Map<String, List<Double>> allUserEmission = new HashMap<>();

        for (Object[] row : allUsers) {

            String category = (String) row[1];

            Double emission =
                    ((Number) row[2]).doubleValue();

            allUserEmission
                    .computeIfAbsent(category, k -> new ArrayList<>())
                    .add(emission);
        }

        List<BenchmarkResponse> response = new ArrayList<>();

        for (Object[] row : platform) {

            String category = (String) row[0];

            Double average =
                    ((Number) row[1]).doubleValue();

            Double mine =
                    userEmission.getOrDefault(category, 0.0);

            List<Double> emissions =
                    allUserEmission.getOrDefault(category, new ArrayList<>());

            Collections.sort(emissions);

            int count = 0;

            for (Double value : emissions) {

                if (value <= mine) {
                    count++;
                }
            }

            double percentile =
                    emissions.isEmpty()
                            ? 100
                            : 100 - ((count * 100.0) / emissions.size());

            percentile =
                    Math.round(percentile * 100.0) / 100.0;

            String performance;

            if (percentile >= 80) {

                performance = "Excellent";

            } else if (percentile >= 60) {

                performance = "Good";

            } else if (percentile >= 40) {

                performance = "Average";

            } else {

                performance = "Needs Improvement";
            }

            response.add(
                    BenchmarkResponse.builder()
                            .category(category)
                            .userEmission(
                                    Math.round(mine * 100.0) / 100.0
                            )
                            .platformAverage(
                                    Math.round(average * 100.0) / 100.0
                            )
                            .percentile(percentile)
                            .performance(performance)
                            .build()
            );
        }

        return response;
    }
}