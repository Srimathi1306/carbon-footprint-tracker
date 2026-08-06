package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.dto.WeeklyMissionResponse;
import com.carbonfootprint.footprint_backend.entity.MissionStatus;
import com.carbonfootprint.footprint_backend.entity.NotificationType;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.entity.WeeklyMission;
import com.carbonfootprint.footprint_backend.repository.ActivityRepository;
import com.carbonfootprint.footprint_backend.repository.UserRepository;
import com.carbonfootprint.footprint_backend.repository.WeeklyMissionRepository;
import com.carbonfootprint.footprint_backend.service.NotificationService;
import com.carbonfootprint.footprint_backend.service.WeeklyMissionService;
import com.carbonfootprint.footprint_backend.service.XpService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WeeklyMissionServiceImpl
        implements WeeklyMissionService {

    private final WeeklyMissionRepository weeklyMissionRepository;
    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final XpService xpService;
    private final NotificationService notificationService;

    @Override
    public List<WeeklyMissionResponse> getCurrentWeekMissions(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        LocalDate weekStart =
                LocalDate.now()
                        .with(java.time.DayOfWeek.MONDAY);

        List<WeeklyMission> missions =
                weeklyMissionRepository.findByUserAndWeekStart(
                        user,
                        weekStart
                );

        if (missions.isEmpty()) {

            generateWeeklyMissions(user);

            missions =
                    weeklyMissionRepository.findByUserAndWeekStart(
                            user,
                            weekStart
                    );
        }

        return missions.stream()
                .map(this::mapToResponse)
                .toList();
    }


    @Override
    public void updateWeeklyMissionProgress(User user) {

        LocalDate weekStart =
                LocalDate.now()
                        .with(java.time.DayOfWeek.MONDAY);

        List<WeeklyMission> missions =
                weeklyMissionRepository.findByUserAndWeekStart(
                        user,
                        weekStart
                );

        long activityCount =
                activityRepository.findByUser(user)
                        .stream()
                        .filter(a ->
                                !a.getActivityDate().isBefore(weekStart))
                        .count();

        for (WeeklyMission mission : missions) {

            if (mission.getStatus() == MissionStatus.COMPLETED)
                continue;

            if (mission.getTitle().equals("Log 15 Activities")) {

                mission.setCurrentValue((int) activityCount);

                if (activityCount >= mission.getTargetValue()) {

                    mission.setStatus(MissionStatus.COMPLETED);

                    xpService.addXp(
                            user,
                            50,
                            "Weekly Mission Completed"
                    );

                    notificationService.createNotification(
                            user,
                            NotificationType.MISSION,
                            "Weekly Mission Completed",
                            "You earned +50 XP.",
                            "/daily-missions"
                    );
                }
            }

            weeklyMissionRepository.save(mission);
        }
    }

    private void generateWeeklyMissions(User user) {

        LocalDate weekStart =
                LocalDate.now()
                        .with(java.time.DayOfWeek.MONDAY);

        LocalDate weekEnd = weekStart.plusDays(6);

        List<WeeklyMission> missions = List.of(

                WeeklyMission.builder()
                        .user(user)
                        .title("Log 15 Activities")
                        .description("Log 15 activities this week.")
                        .targetValue(15)
                        .currentValue(0)
                        .status(MissionStatus.ACTIVE)
                        .weekStart(weekStart)
                        .weekEnd(weekEnd)
                        .build()

        );

        weeklyMissionRepository.saveAll(missions);
    }

    private WeeklyMissionResponse mapToResponse(
            WeeklyMission mission) {

        return WeeklyMissionResponse.builder()
                .id(mission.getId())
                .title(mission.getTitle())
                .description(mission.getDescription())
                .targetValue(mission.getTargetValue())
                .currentValue(mission.getCurrentValue())
                .status(mission.getStatus())
                .build();
    }

}