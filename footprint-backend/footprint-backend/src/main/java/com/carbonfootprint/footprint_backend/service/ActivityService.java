package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.ActivityRequest;
import com.carbonfootprint.footprint_backend.dto.ActivityResponse;

import java.util.List;

public interface ActivityService {

    ActivityResponse addActivity(ActivityRequest request, String email);

    List<ActivityResponse> getMyActivities(String email);

    ActivityResponse getActivityById(Long id, String email);

    ActivityResponse updateActivity(Long id,
                                    ActivityRequest request,
                                    String email);

    void deleteActivity(Long id, String email);
    List<ActivityResponse> getAllActivities();

    List<ActivityResponse> getOrganizationActivities(
            String organizationEmail
    );
}