package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.DailyMissionResponse;
import com.carbonfootprint.footprint_backend.entity.User;

import java.util.List;

public interface DailyMissionService {

    List<DailyMissionResponse> getTodayMissions(String email);

    void updateMissionProgress(User user);

}