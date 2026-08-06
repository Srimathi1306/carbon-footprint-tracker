package com.carbonfootprint.footprint_backend.repository;

import com.carbonfootprint.footprint_backend.entity.DailyMission;
import com.carbonfootprint.footprint_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DailyMissionRepository
        extends JpaRepository<DailyMission,Long> {

    List<DailyMission> findByUserAndMissionDate(
            User user,
            LocalDate missionDate
    );

}
