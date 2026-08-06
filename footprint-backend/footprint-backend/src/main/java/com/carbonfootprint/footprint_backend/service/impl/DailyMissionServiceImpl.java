package com.carbonfootprint.footprint_backend.service.impl;


import com.carbonfootprint.footprint_backend.dto.DailyMissionResponse;
import com.carbonfootprint.footprint_backend.entity.*;
import com.carbonfootprint.footprint_backend.repository.ActivityRepository;
import com.carbonfootprint.footprint_backend.repository.DailyMissionRepository;
import com.carbonfootprint.footprint_backend.repository.UserRepository;
import com.carbonfootprint.footprint_backend.service.DailyMissionService;
import com.carbonfootprint.footprint_backend.service.NotificationService;
import com.carbonfootprint.footprint_backend.service.XpService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DailyMissionServiceImpl implements DailyMissionService {

    private final DailyMissionRepository dailyMissionRepository;
    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final XpService xpService;
    private final NotificationService notificationService;

    @Override
    public List<DailyMissionResponse> getTodayMissions(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate today = LocalDate.now();

        List<DailyMission> missions =
                dailyMissionRepository.findByUserAndMissionDate(user, today);

        if (missions.isEmpty()) {

            generateTodayMissions(user);

            missions =
                    dailyMissionRepository.findByUserAndMissionDate(user, today);
        }

        return missions.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void updateMissionProgress(User user) {

        LocalDate today = LocalDate.now();

        List<DailyMission> missions =
                dailyMissionRepository.findByUserAndMissionDate(user, today);

        if (missions.isEmpty()) {
            return;
        }

        long activityCount =
                activityRepository.findByUser(user)
                        .stream()
                        .filter(a -> a.getActivityDate().equals(today))
                        .count();

        for (DailyMission mission : missions) {

            if (mission.getStatus() == MissionStatus.COMPLETED) {
                continue;
            }

            switch (mission.getTitle()) {

                case "Log 3 Activities":

                    mission.setCurrentValue((int) activityCount);

                    if (activityCount >= mission.getTargetValue()) {

                        mission.setStatus(MissionStatus.COMPLETED);

                        xpService.addXp(
                                user,
                                20,
                                "Daily Mission Completed"
                        );

                        notificationService.createNotification(
                                user,
                                NotificationType.MISSION,
                                "Mission Completed",
                                "You earned +20 XP.",
                                "/daily-missions"
                        );
                    }

                    break;

                case "Reduce Transport":

                    double transport =
                            activityRepository
                                    .findByUser(user)
                                    .stream()
                                    .filter(a ->
                                            a.getActivityDate().equals(today))
                                    .filter(a ->
                                            a.getEmissionFactor()
                                                    .getCategory()
                                                    .getName()
                                                    .equalsIgnoreCase("Transport"))
                                    .mapToDouble(Activity::getCarbonEmission)
                                    .sum();

                    if (transport <= 2.0) {

                        mission.setCurrentValue(1);

                        mission.setStatus(MissionStatus.COMPLETED);

                        xpService.addXp(
                                user,
                                30,
                                "Transport Mission"
                        );

                        notificationService.createNotification(
                                user,
                                NotificationType.MISSION,
                                "Mission Completed",
                                "Transport mission completed!",
                                "/daily-missions"
                        );
                    }

                    break;

                case "Save Electricity":

                    double electricity =
                            activityRepository
                                    .findByUser(user)
                                    .stream()
                                    .filter(a ->
                                            a.getActivityDate().equals(today))
                                    .filter(a ->
                                            a.getEmissionFactor()
                                                    .getCategory()
                                                    .getName()
                                                    .equalsIgnoreCase("Electricity"))
                                    .mapToDouble(Activity::getCarbonEmission)
                                    .sum();

                    if (electricity <= 1.0) {

                        mission.setCurrentValue(1);

                        mission.setStatus(MissionStatus.COMPLETED);

                        xpService.addXp(
                                user,
                                30,
                                "Electricity Mission"
                        );

                        notificationService.createNotification(
                                user,
                                NotificationType.MISSION,
                                "Mission Completed",
                                "Electricity mission completed!",
                                "/daily-missions"
                        );
                    }

                    break;
            }

            dailyMissionRepository.save(mission);
        }
    }

    private void generateTodayMissions(User user) {

        LocalDate today = LocalDate.now();

        List<DailyMission> missions = List.of(

                DailyMission.builder()
                        .user(user)
                        .title("Log 3 Activities")
                        .description("Record 3 activities today.")
                        .targetValue(3)
                        .currentValue(0)
                        .status(MissionStatus.ACTIVE)
                        .missionDate(today)
                        .build(),

                DailyMission.builder()
                        .user(user)
                        .title("Reduce Transport")
                        .description("Reduce today's transport emission.")
                        .targetValue(1)
                        .currentValue(0)
                        .status(MissionStatus.ACTIVE)
                        .missionDate(today)
                        .build(),

                DailyMission.builder()
                        .user(user)
                        .title("Save Electricity")
                        .description("Reduce today's electricity emission.")
                        .targetValue(1)
                        .currentValue(0)
                        .status(MissionStatus.ACTIVE)
                        .missionDate(today)
                        .build()

        );

        dailyMissionRepository.saveAll(missions);
    }

    private DailyMissionResponse mapToResponse(DailyMission mission) {

        return DailyMissionResponse.builder()
                .id(mission.getId())
                .title(mission.getTitle())
                .description(mission.getDescription())
                .targetValue(mission.getTargetValue())
                .currentValue(mission.getCurrentValue())
                .status(mission.getStatus())
                .build();
    }
}