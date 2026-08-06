package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.GoalRequest;
import com.carbonfootprint.footprint_backend.dto.GoalResponse;
import com.carbonfootprint.footprint_backend.entity.User;

public interface GoalService {

    GoalResponse createGoal(GoalRequest request, String email);

    GoalResponse updateGoal(Long goalId, GoalRequest request, String email);

    GoalResponse getMyGoal(String email);

    void cancelGoal(Long goalId, String email);

    void evaluateGoal(User user);

}

