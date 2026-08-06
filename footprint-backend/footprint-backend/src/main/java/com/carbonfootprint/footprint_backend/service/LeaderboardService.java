package com.carbonfootprint.footprint_backend.service;
import com.carbonfootprint.footprint_backend.dto.LeaderboardResponse;

import java.util.List;

public interface LeaderboardService {

    List<LeaderboardResponse> getLeaderboard();

}