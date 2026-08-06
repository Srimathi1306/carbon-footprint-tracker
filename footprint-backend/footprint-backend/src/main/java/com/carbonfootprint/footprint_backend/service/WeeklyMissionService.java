package com.carbonfootprint.footprint_backend.service;


import com.carbonfootprint.footprint_backend.dto.WeeklyMissionResponse;
import com.carbonfootprint.footprint_backend.entity.User;

import java.util.List;

public interface WeeklyMissionService {

    List<WeeklyMissionResponse> getCurrentWeekMissions(String email);

    void updateWeeklyMissionProgress(User user);

}