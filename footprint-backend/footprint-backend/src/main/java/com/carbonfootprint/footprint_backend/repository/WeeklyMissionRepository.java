package com.carbonfootprint.footprint_backend.repository;

import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.entity.WeeklyMission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface WeeklyMissionRepository
        extends JpaRepository<WeeklyMission, Long> {

    List<WeeklyMission> findByUserAndWeekStart(
            User user,
            LocalDate weekStart
    );

}