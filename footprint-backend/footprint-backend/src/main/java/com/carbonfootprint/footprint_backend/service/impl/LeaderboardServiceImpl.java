package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.dto.LeaderboardResponse;
import com.carbonfootprint.footprint_backend.entity.Activity;
import com.carbonfootprint.footprint_backend.entity.Goal;
import com.carbonfootprint.footprint_backend.entity.GoalStatus;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.repository.ActivityRepository;
import com.carbonfootprint.footprint_backend.repository.BadgeRepository;
import com.carbonfootprint.footprint_backend.repository.GoalRepository;
import com.carbonfootprint.footprint_backend.repository.UserRepository;
import com.carbonfootprint.footprint_backend.service.LeaderboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaderboardServiceImpl implements LeaderboardService {

    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;
    private final ActivityRepository activityRepository;

    @Override
    public List<LeaderboardResponse> getLeaderboard() {

        List<User> users = userRepository.findAll();

        List<LeaderboardResponse> leaderboard = users.stream()

                .map(user -> {

                    double totalEmission =
                            activityRepository.findByUser(user)
                                    .stream()
                                    .mapToDouble(Activity::getCarbonEmission)
                                    .sum();

                    int badgeCount =
                            badgeRepository.findByUser(user).size();

                    return LeaderboardResponse.builder()
                            .userId(user.getId())
                            .name(user.getName())
                            .xp(user.getXp())
                            .streak(user.getCurrentStreak())
                            .badgeCount(badgeCount)
                            .totalEmission(
                                    Math.round(totalEmission * 100.0) / 100.0
                            )
                            .build();

                })

                .sorted(

                        Comparator

                                .comparing(
                                        LeaderboardResponse::getXp,
                                        Comparator.reverseOrder()
                                )

                                .thenComparing(
                                        LeaderboardResponse::getTotalEmission
                                )

                                .thenComparing(
                                        LeaderboardResponse::getStreak,
                                        Comparator.reverseOrder()
                                )

                )

                .toList();

        List<LeaderboardResponse> ranked =
                new ArrayList<>();

        int rank = 1;

        for (LeaderboardResponse user : leaderboard) {

            user.setRank(rank++);

            ranked.add(user);

        }

        return ranked;
    }
}
